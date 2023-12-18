import React from 'react';
import Spinner from './Spinner';

interface ButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'cancel';
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  onClick,
  children,
  variant = 'primary',
}) => {
  const baseClasses = 'flex items-center justify-center gap-2';
  let variantClasses;

  switch (variant) {
    case 'primary':
      variantClasses =
        'w-full font-semibold mt-4 rounded-md py-2 hover:bg-slate-800 duration-200 hover:text-slate-400 bg-white text-slate-700 border border-slate-800';
      break;
    case 'secondary':
      variantClasses =
        'hover:bg-slate-800 active:bg-slate-900 duration-200 bg-slate-600 text-white font-bold py-2.5 px-5 rounded-full';
      break;
    case 'tertiary':
      variantClasses =
        'hover:bg-red-800 active:bg-red-900 duration-200 bg-red-600 text-white font-bold py-2.5 px-5 rounded-full';
      break;
    case 'success':
      variantClasses =
        'hover:bg-green-800 active:bg-green-900 duration-200 bg-green-600 text-white font-bold py-2.5 px-5 rounded-full';
      break;
    case 'danger':
      variantClasses =
        'hover:bg-red-800 active:bg-red-900 duration-200 bg-red-600 text-white font-bold py-2.5 px-5 rounded-full';
      break;
    case 'cancel':
      variantClasses =
        'hover:opacity-100 opacity-75 active:opacity-100 duration-200 text-white font-semibold ';
      break;
    default:
      variantClasses =
        'hover:bg-slate-800 duration-200 hover:text-slate-400 bg-white text-slate-700 border border-slate-800';
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {children}
      {isLoading && <Spinner customClass='ml-2 inline-block' stroke='black' />}
    </button>
  );
};

export default Button;
