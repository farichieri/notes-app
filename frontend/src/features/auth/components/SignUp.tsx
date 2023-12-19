'use client';

import {
  Modal,
  selectModalSlice,
  setSignInModalOpen,
  setSignUpModalOpen,
} from '@/features/modals';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useState } from 'react';
import { useRegisterMutation } from '../services';
import { setCredentials } from '../slice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';

interface Props {}

const SignUp: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isSignUpModalOpen } = useAppSelector(selectModalSlice);
  const [register, { isLoading, isError, error, data }] = useRegisterMutation();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register({
        name: input.name,
        email: input.email,
        password: input.password,
      }).unwrap();

      dispatch(
        setCredentials({
          user: res.user,
          token: res.token,
        })
      );
      dispatch(setSignUpModalOpen(false));
      router.push('/app');
    } catch (error) {
      console.log({ error });
    }
  };

  const handleClose = () => {
    dispatch(setSignUpModalOpen(false));
  };

  const handleSignIn = () => {
    handleClose();
    dispatch(setSignInModalOpen(true));
  };

  if (!isSignUpModalOpen) return null;

  return (
    <Modal withCloseButton={true} onClose={handleClose}>
      <div className='text-primary sm:max-w-sm border border-slate-800 flex overflow-auto flex-col max-w-[95vw] bg-secondary rounded-3xl bg-slate-900'>
        <div className=' bg-slate-950 text-center w-full h-full p-10'>
          <h1 className='text-2xl font-bold my-3'>Sign up</h1>
          <p>Create your account and start taking notes easily</p>
        </div>
        <div className='w-full bg-slate-900 h-full p-8 sm:p-14 border-t border-slate-800'>
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <input
              className='rounded-md py-2 bg-slate-800 px-2'
              placeholder='Name'
              type='text'
              name='name'
              onChange={handleChange}
              value={input.name}
            />
            <input
              className='rounded-md py-2 bg-slate-800 px-2'
              placeholder='Email'
              type='text'
              name='email'
              onChange={handleChange}
              value={input.email}
            />
            <input
              className='rounded-md py-2 bg-slate-800 px-2'
              placeholder='Password'
              type='password'
              name='password'
              onChange={handleChange}
              value={input.password}
            />
            {isError && error && (
              <div className='text-red-500 text-sm text-center'>
                {('data' in error && error.data.message) || 'Unexpected Error'}
              </div>
            )}
            <Button variant='primary' isLoading={isLoading}>
              Continue
            </Button>
          </form>
          <div className='mt-8'>
            <span>
              already have an account?{' '}
              <button className='text-slate-400' onClick={handleSignIn}>
                Log in
              </button>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignUp;
