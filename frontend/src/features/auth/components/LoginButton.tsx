'use client';

import { Button } from '@/components';
import { setSignInModalOpen } from '@/features/modals';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuthSlice } from '../slice';
import { useRouter } from 'next/navigation';

interface Props {}

const LoginButton: React.FC<Props> = () => {
  const { user } = useAppSelector(selectAuthSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.replace('/app');
    } else {
      dispatch(setSignInModalOpen(true));
    }
  };

  return (
    <Button variant='secondary' onClick={handleClick}>
      Get Started
    </Button>
  );
};

export default LoginButton;
