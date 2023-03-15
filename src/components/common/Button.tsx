import React, { useState } from 'react';

interface ButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  property?: 'primary' | 'secondary' | 'question' | 'small' | 'detail';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children?: React.ReactElement | string;
  className?: string;
  small?: boolean;
  onClick?: () => void;
}

export default function Button({
  property = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  children,
  className,
  small = false,
  onClick,
  ...props
}: ButtonPropsType) {
  const setClassNameByProperty = (property: string) => {
    switch (property) {
      case 'primary':
        return small
          ? '!h-[3.5rem] rounded-[1.25rem] bg-main-2 hover:bg-main-4 text-[1.125rem]'
          : 'bg-main-2 hover:bg-main-4 text-[1.375rem]';
      case 'secondary':
        return 'text-[1.375rem] hover:bg-gray-4 bg-gray-2';
      case 'question':
        return 'bg-main-2 hover:bg-main-4 border-2 border-main-3 text-[1.125rem]';
      case 'small':
        return 'bg-main-2 hover:bg-main-4 text-[1.125rem]';
      case 'detail':
        return 'bg-sub-1 hover:bg-main-4 text-lg rounded-[1.25rem]';
      default:
        return '';
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex h-[4.375rem] w-full cursor-pointer items-center justify-center rounded-[1.875rem] py-[1.25rem] font-normal text-gray-8 ease-in disabled:cursor-not-allowed ${setClassNameByProperty(
        property,
      )} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
