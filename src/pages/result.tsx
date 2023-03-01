import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@components/common/Button';
import Card from '@components/result/Card';
import FitHobby from '@components/result/FitHobby';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from 'react-query';
import Model from '@components/result/Model';
import IconTurn from '@public/static/icon_turn.svg';
import { getRecommendation } from 'pages/api/getRecommendation';
import Image from 'next/image';
import { HobbyType } from 'types/result';

export default function Result() {
  const router = useRouter();
  const [isFitHobby, setIsFitHobby] = useState<Boolean>(false);
  const id = router?.query.id ?? 0;
  const { data, isLoading } = useQuery(
    ['getRecommendation', id],
    () => getRecommendation(+id),
    {
      enabled: !!id,
    },
  );
  const recommendation = data?.data?.data?.recommendation;
  return (
    <div className="text-center">
      {!isFitHobby ? (
        <div>
          <section className="mt-6 flex flex-col items-center">
            <p className="text-2xl text-main-4">
              <span className="text-2xl text-main-3">
                {recommendation?.user.name}
              </span>
              님의 홀랑 유형
            </p>
            <div className="h-52">
              <Model uri="./static/gltf/ENFJ.gltf" />
            </div>
            <p className="mt-4 text-2xl text-gray-7">
              {recommendation?.hobbyType.name}
            </p>
            <IconTurn className="my-2" />
            <span className=" text-gray-5 ">회전하면 돌아가요!</span>
            <p className="mt-8 w-[17.1875rem] text-[1.125rem] leading-[1.875rem] text-gray-8">
              {recommendation?.hobbyType.description}
            </p>
          </section>
          <section className="mt-16">
            <p className="text-2xl text-main-4">
              <span className="text-2xl text-main-3">
                {recommendation?.user.name}
              </span>
              님의 홀랑 취미
            </p>
            <p className="mt-4 text-[1.125rem] text-gray-7">
              버튼을 눌러 자세히 둘러봐요!
            </p>
            <Swiper className="mySwiper mt-6" slidesPerView={1.4}>
              {recommendation?.hobbies.map((hobby: HobbyType) => (
                <SwiperSlide key={hobby?.id}>
                  <Card hobby={hobby} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          <section className="mt-12 w-full ">
            <p className="text-2xl text-main-4 ">나와 찰떡인 홀랑 유형</p>
            <p className="mt-5">아래 버튼을 눌러 알아봐요!</p>
            <div className="mt-8 flex justify-center">
              <Image
                alt="fit-hobby-type"
                src={`${process.env.NEXT_PUBLIC_API_CLOUD}/images/etc/question-mark.png`}
                width={100}
                height={100}
                onClick={() => {
                  setIsFitHobby(true);
                }}
              />
            </div>
            <div className="mt-6">
              <div>
                <Button
                  onClick={() => {
                    router.push('/share');
                  }}
                >
                  공유하기
                </Button>
              </div>
              <div className="mt-4">
                <Button
                  property="secondary"
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  다시하기
                </Button>
              </div>
              <div className="h-[2.8125rem]"></div>
            </div>
          </section>
        </div>
      ) : (
        recommendation && (
          <FitHobby fitHobbyTypes={recommendation?.fitHobbyTypes} />
        )
      )}
    </div>
  );
}
