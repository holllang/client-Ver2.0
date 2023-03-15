import Image from 'next/image';
import { useEffect, useState } from 'react';
import TopBar from './TopBar';

const LOADING_IMAGE_SRC = `${process.env.NEXT_PUBLIC_API_CLOUD}/images/etc/loading.gif`;
export default function ResultLoader() {
  const [nickname, setNickname] = useState<string>();
  useEffect(() => {
    setNickname(localStorage.getItem('nickname') || '');
  }, []);

  return (
    <div className="z-50 flex h-[60rem] flex-col items-center justify-center bg-white text-center">
      <div className="absolute top-0">
        <TopBar />
      </div>
      <video className="hello" autoPlay muted loop>
        <source
          src="https://dnynkguj26y10.cloudfront.net/images/etc/loading.mp4"
          type="video/mp4"
        />
      </video>

      <p className="mt-[3.5rem] text-[1.375rem] leading-8 text-gray-6">
        인공지능이 {nickname}님을 위한
        <br /> 최적의 취미를 찾고있어요!
      </p>
    </div>
  );
}
