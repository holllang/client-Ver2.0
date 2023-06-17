import Button from '@components/common/Button';
import GoogleAd from '@components/common/GoogleAd';
import ProgressBar from '@components/common/ProgressBar';
import TopBar from '@components/common/TopBar';
import { getUserQuestion, getUserResult } from 'api/getUserQuestion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserRecommendation } from 'store/atom';

interface QuestionContentType {
  id: number;
  content: string;
  number: number;
}

interface QuestionDataType {
  answers: QuestionContentType[];
  content: string;
  id: number;
  imageUrl: string;
  number: number;
}

export const getStaticProps = async () => {
  const { data } = await getUserQuestion();
  return {
    props: {
      data: data.data.test.questions,
    },
  };
};

export default function question({ data }: { data: QuestionDataType[] }) {
  console.log(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionArray, setQuestionArray] = useState<
    { questionNumber: number; answerNumber: number }[]
  >([]);

  const router = useRouter();
  const MAX_PAGE = 12;
  const setUserRecommendation = useSetRecoilState(UserRecommendation);

  const nickname = '규성';
  // const nickname = localStorage.getItem('nickname') || '';

  const handleClickQuestion = (clickedIndex: number) => {
    if (currentPage === MAX_PAGE) {
      const getData = async () => {
        const resData = await getUserResult(
          [
            ...questionArray,
            { questionNumber: currentPage, answerNumber: clickedIndex + 1 },
          ],
          nickname,
        );
        const userId = resData.data.data.recommendation.id;
        setUserRecommendation(userId);
        router.push(`/result?id=${userId}`);
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

  return (
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
      <section className="flex flex-col items-center ">
        <Image
          className="mb-[2rem] rounded-[1.25rem]  px-4"
          alt="image that explain Question"
          width={450}
          height={450}
          src={data[currentPage - 1].imageUrl}
        />
        <p className="mb-8 flex h-[5.75rem] items-center text-center text-[1.25rem] leading-7">
          {data[currentPage - 1].content.replace('000', nickname)}
        </p>
        <div className="mb-13 flex w-full flex-col gap-4">
          {data[currentPage - 1].answers.map(({ content, id }, index) => (
            <Button
              key={id}
              onClick={() => handleClickQuestion(index)}
              type="button"
              property="question"
            >
              {content}
            </Button>
          ))}
        </div>
        <GoogleAd />
      </section>
    </div>
  );
}
