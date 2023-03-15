import React from 'react';

import Button from './Button';

interface ModalProps {
  message: string;
  onCloseModal: () => void;
}

export default function Modal({ message, onCloseModal }: ModalProps) {
  return (
    <div className="fixed inset-x-0 inset-y-0 z-20 ">
      <div
        className="absolute inset-0 z-20 bg-gray-8/[.64] opacity-80 "
        onClick={onCloseModal}
      />
      <div className="absolute inset-0 z-20 m-auto flex h-[10.625rem] max-w-[25.625rem]  flex-col items-center justify-evenly rounded-[30px] bg-white text-xl font-normal text-gray-7">
        <p className="mt-[0.9375rem]">{message}</p>
        <div className="mt-4 flex w-[14.5rem] items-center justify-center">
          <button
            onClick={onCloseModal}
            className="flex h-[3.5rem] w-[11.4375rem]  cursor-pointer items-center justify-center rounded-[1.25rem] bg-main-2 py-[1.25rem] text-lg font-normal text-gray-8 ease-in hover:bg-main-4 disabled:cursor-not-allowed"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
