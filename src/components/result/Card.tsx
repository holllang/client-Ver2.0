import React from 'react';
import { useRouter } from 'next/router';
import ExampleHobby from '@public/static/example_hobby.svg';
import Button from '../common/Button';
import Image from 'next/image';
import { HobbyType } from 'types/result';

interface CardProps {
  hobby: HobbyType;
}
export default function Card({ hobby }: CardProps) {
  const router = useRouter();
  return (
    <div className="relative flex h-[20.5rem] w-[calc(100%-1rem)]  justify-center rounded-[1.875rem] border border-main-3 bg-main-1 ">
      <div className="flex h-[15.625rem] flex-col justify-center gap-5">
        <ExampleHobby />
        {/* <Image alt="hobby" src={hobby.imageUrl} width={50} height={50} /> */}
        <p className="text-2xl text-gray-6">{hobby?.name}</p>
      </div>
      <div className="absolute bottom-6 w-full px-4">
        <Button
          onClick={() => {
            router.push(`/detail?id=${hobby.id}`);
          }}
        >
          더 알아보기
        </Button>
      </div>
    </div>
  );
}