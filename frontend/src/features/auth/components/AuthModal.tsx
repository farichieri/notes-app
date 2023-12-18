'use client';

import { selectModalSlice } from '@/features/modals';
import { useAppSelector } from '@/hooks';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface Props {}

const AuthModal: React.FC<Props> = () => {
  const { isSignInModalOpen, isSignUpModalOpen } =
    useAppSelector(selectModalSlice);

  if (isSignInModalOpen) return <SignIn />;
  if (isSignUpModalOpen) return <SignUp />;
};

export default AuthModal;
