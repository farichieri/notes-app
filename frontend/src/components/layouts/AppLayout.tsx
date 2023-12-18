'use client';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { AppNav, Sidebar } from '..';
import { selectAuthSlice } from '@/features/auth/slice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { selectModalSlice, setToggleSidebarIsOpen } from '@/features/modals';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  const { user } = useAppSelector(selectAuthSlice);
  const { isSidebarOpen } = useAppSelector(selectModalSlice);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const toggleSidebar = () => {
    dispatch(setToggleSidebarIsOpen());
  };

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div
      className={`flex duration-300 transition-all bg-slate-950 min-h-screen flex-col items-center justify-between pt-[var(--nav-height)] ${
        isSidebarOpen ? 'sm:pl-48' : ''
      }`}
    >
      <AppNav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main className={`my-10 w-full px-4`}>{children}</main>
    </div>
  );
};

export default AppLayout;
