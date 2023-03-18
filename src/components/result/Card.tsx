import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import { HobbyType } from 'types/result';

import Button from '../common/Button';

interface CardProps {
  id: string | number | string[];
  hobby: HobbyType;
}
export default function Card({ hobby, id }: CardProps) {
  const router = useRouter();
  return (
    <div className="relative flex h-[16.5625rem] w-[calc(100%-1rem)] flex-col items-center rounded-[1.875rem] border border-main-3">
      <Image
        alt="hobby"
        src={hobby.imageUrl}
        width={70}
        height={70}
        className="mt-[2.75rem]"
      />
      <p className="mt-[1.25rem] font-AppleB text-[1.125rem] text-gray-6">
        {hobby?.name}
      </p>
      <div className="mt-[1.25rem] w-full px-4 ">
        <Button
          small
          onClick={() => {
            router.push({
              pathname: 'result',
              query: { id: id, view: 'hobbyDetail', hobbyid: hobby.id },
            });
          }}
          className="h-[3.5rem] rounded-[1.25rem] font-AppleM  text-[1.125rem] text-gray-7"
        >
          더 알아보기
        </Button>
      </div>
    </div>
  );
}
