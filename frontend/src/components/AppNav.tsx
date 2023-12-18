'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { MdMenu } from 'react-icons/md';
import { RoundButton } from '.';

const AuthButton = dynamic(
  () => import('@/features/auth/components/AuthButton'),
  { ssr: false }
);

interface Props {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const AppNav: React.FC<Props> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className='h-[var(--nav-height)] px-4 left-0 right-0 z-[110] bg-black/30 backdrop-blur-sm border-slate-800 border-b w-full flex items-center justify-center fixed top-0'>
      <RoundButton customClass='mr-2' onClick={toggleSidebar}>
        <MdMenu className='text-xl' />
      </RoundButton>
      <Link className='font-semibold text-sm mr-auto' href='/'>
        Ensolvers Notes
      </Link>
      <AuthButton />
    </nav>
  );
};

export default AppNav;
