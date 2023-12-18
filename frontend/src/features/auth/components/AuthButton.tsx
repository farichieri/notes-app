'use client';

import { Button } from '@/components';
import { logout, selectAuthSlice } from '../slice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { setSignInModalOpen } from '@/features/modals';

interface Props {}

const AuthButton = () => {
  const { user } = useAppSelector(selectAuthSlice);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  if (pathname.includes('/app')) {
    return (
      <Button variant='tertiary' onClick={() => dispatch(logout())}>
        Log Out
      </Button>
    );
  }

  if (user) {
    return (
      <Link href='/app'>
        <Button variant='success'>Go to App</Button>
      </Link>
    );
  } else {
    return (
      <Button
        variant='secondary'
        onClick={() => dispatch(setSignInModalOpen(true))}
      >
        Sign In
      </Button>
    );
  }
};

export default AuthButton;
