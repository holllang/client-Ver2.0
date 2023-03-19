import Image from 'next/image';
import { useEffect, useState } from 'react';
import TopBar from './TopBar';

const LOADING_IMAGE_SRC = `${process.env.NEXT_PUBLIC_API_CLOUD}/images/etc/loading.png`;
export default function ResultLoader() {
  const [nickname, setNickname] = useState<string>();
  useEffect(() => {
    setNickname(localStorage.getItem('nickname') || '');
  }, []);

  return (
    <div className="z-100 flex h-[60rem] flex-col items-center justify-center  text-center ">
      <div className="absolute top-0">
        <TopBar />
      </div>
      <div className="z-50 flex w-full justify-center bg-white">
        <div className="h-[16rem] w-[16rem] overflow-hidden rounded-full bg-white">
          <div className="relative mt-[2.6rem] h-[10rem] w-[200rem] overflow-hidden">
            <Image
              alt="loading"
              src={LOADING_IMAGE_SRC}
              width={3200}
              height={3000}
              className="z-10 animate-pass-by-1 object-cover"
            />
          </div>
        </div>
      </div>
      <p className="mt-[3.5rem] font-AppleB text-[1.375rem] leading-8 text-gray-6">
        인공지능이 {nickname}님을 위한
        <br /> 최적의 취미를 찾고있어요!
      </p>
    </div>
  );
}
