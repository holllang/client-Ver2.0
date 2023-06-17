import Back from '@public/static/back.svg';
import MainLogo from '@public/static/main_logo.svg';
import TestResultLogo from '@public/static/test_result_logo.svg';
import Router, { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

interface ITopBar {
  isBackButton?: boolean;
  mainMessage?: 'main' | 'result';
  onBackButton?: () => void;
}

export default function TopBar({
  isBackButton,
  mainMessage = 'main',
  onBackButton = () => {
    Router.back();
  },
}: ITopBar) {
  return (
    <div className="flex w-full justify-between py-6">
      {isBackButton ? (
        <Image
          src="/static/back.svg"
          width={30}
          height={30}
          alt="back"
          onClick={onBackButton}
        />
      ) : (
        <div />
      )}

      {mainMessage === 'main' ? (
        <Image
          alt="logo"
          src="/static/logo_main.png"
          width={100}
          height={100}
        />
      ) : (
        <TestResultLogo />
      )}
      <div />
    </div>
  );
}
