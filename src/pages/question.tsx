import Button from '@components/common/Button';
import ProgressBar from '@components/common/ProgressBar';
import TopBar from '@components/common/TopBar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import {
  GetUserQuestionType,
  QuestionContentType,
} from 'types/getUserQuestion';
import { useSetRecoilState } from 'recoil';
import { UserRecommendation } from 'store/atom';
import { getUserQuestion, getUserResult } from 'api/getUserQuestion';
import Loader from '@components/common/Loader';
import GoogleAd from '@components/common/GoogleAd';

interface QuestionDataType {
  answers: QuestionContentType[];
  content: string;
  id: number;
  imageUrl: string;
}

export default function question() {
  const { data, isSuccess } = useQuery(['getUserQuestion'], getUserQuestion, {
    staleTime: Infinity,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [questionArray, setQuestionArray] = useState<
    { questionNumber: number; answerNumber: number }[]
  >([]);
  const [questionData, setQuestionData] = useState<GetUserQuestionType | null>(
    null,
  );
  const router = useRouter();
  const MAX_PAGE = 12;
  const setUserRecommendation = useSetRecoilState(UserRecommendation);

  const [loading, setLoading] = useState(false);

  const setImageLoadingComplete = (e: any) => {
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [currentPage]);

  useEffect(() => {
    if (data !== undefined) {
      setQuestionData(data?.data);
    }
  }, [data, isSuccess]);

  const handleClickQuestion = (clickedIndex: number) => {
    setIsButtonClicked(true);
    if (currentPage === MAX_PAGE) {
      const getData = async () => {
        const data = await getUserResult(
          [
            ...questionArray,
            { questionNumber: currentPage, answerNumber: clickedIndex + 1 },
          ],
          localStorage.getItem('nickname') as string,
        );
        setUserRecommendation(data.data.data.recommendation.id);
        router.push(`/result?id=${data.data.data.recommendation.id}`);
      };
      return getData();
    }
    setQuestionArray([
      ...questionArray,
      { questionNumber: currentPage, answerNumber: clickedIndex + 1 },
    ]);
    setCurrentPage(currentPage + 1);
  };

  const handleProgressbarBackButton = (currentPage: number) => {
    if (currentPage !== 1) {
      const copiedQuestionArray = [...questionArray];
      copiedQuestionArray.pop();
      setQuestionArray(copiedQuestionArray);
      return setCurrentPage(currentPage - 1);
    }
    return router.back();
  };

  if (loading)
    return (
      <div>
        <Image
          onLoadingComplete={(e) => setImageLoadingComplete(e)}
          loading="eager"
          priority
          className="mb-[2rem] hidden rounded-[1.25rem]  px-4"
          alt="image that explain Question"
          width={450}
          height={450}
          src={
            questionData?.data.test.questions[currentPage - 1]
              .imageUrl as string
          }
        />
        <Loader />
      </div>
    );

  return (
    isSuccess && (
      <div className="pb-[3rem]">
        <div className="px-4">
          <TopBar
            onBackButton={() => handleProgressbarBackButton(currentPage)}
            isBackButton={currentPage > 1}
          />
        </div>
        <section className="mb-[1.75rem] flex flex-col items-center">
          <ProgressBar order={currentPage} />
          <p className="mt-[1rem] font-AppleB text-[1.5rem] leading-[1.875rem] text-gray-6">{`Q.  ${
            currentPage < 10 ? '0' + currentPage : currentPage
          }`}</p>
        </section>
        {questionData?.data.test.questions[currentPage - 1] !== undefined && (
          <section className="flex flex-col items-center ">
            <Image
              className="mb-[2rem] rounded-[1.25rem]  px-4"
              alt="image that explain Question"
              width={450}
              height={450}
              src={questionData?.data.test.questions[currentPage - 1].imageUrl}
            />
            <p className="mb-8 flex h-[5.75rem] items-center text-center text-[1.25rem] leading-7">
              {questionData?.data.test.questions[
                currentPage - 1
              ].content.replace('000', localStorage.getItem('nickname') || '')}
            </p>
            <div className="mb-13 flex w-full flex-col gap-4">
              {questionData?.data.test.questions[currentPage - 1].answers.map(
                ({ content, id }, index) => (
                  <Button
                    disabled={isButtonClicked}
                    key={id}
                    onClick={() => handleClickQuestion(index)}
                    type="button"
                    property="question"
                  >
                    {content}
                  </Button>
                ),
              )}
            </div>
            <GoogleAd></GoogleAd>
          </section>
        )}
      </div>
    )
  );
}
