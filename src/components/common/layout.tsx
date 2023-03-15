import React, { useEffect, useState } from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [applicationValue, setApplicationValue] = useState<
    | {
        innerWidth: number;
        innerHeight: number;
      }
    | undefined
  >();

  useEffect(() => {
    setApplicationValue({
      innerHeight: window.screen.height,
      innerWidth: window.screen.width,
    });
  }, []);

  const getWidth = (
    innerWidth: number | undefined,
    innerHeight: number | undefined,
  ): string => {
    if (innerHeight !== undefined && innerWidth !== undefined) {
      if (innerHeight / innerWidth >= 2) {
        return `max-w-full`;
      }
    }
    return 'max-w-[28.125rem]';
  };

  return (
    <div className="relative flex h-screen w-screen justify-center overflow-hidden bg-sub-2">
      <img
        className={`fixed left-0 top-0 h-full ${
          applicationValue && applicationValue.innerWidth > 450 ? '' : 'hidden'
        } `}
        src={`${process.env.NEXT_PUBLIC_API_CLOUD}/images/etc/background-left.png`}
        alt="background-leftImage"
      />
      <img
        className={`fixed right-0 top-0 h-full object-cover ${
          applicationValue && applicationValue.innerWidth > 450 ? '' : 'hidden'
        } `}
        src={`${process.env.NEXT_PUBLIC_API_CLOUD}/images/etc/background-right.png`}
        alt="background-rightImage"
      />
      <div
        className={`relative h-full w-full ${getWidth(
          applicationValue?.innerWidth,
          applicationValue?.innerHeight,
        )}  overflow-y-scroll bg-gray-0 px-5`}
      >
        {children}
      </div>
    </div>
  );
}
