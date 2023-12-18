import Link from 'next/link';
import dynamic from 'next/dynamic';

const AuthButton = dynamic(
  () => import('@/features/auth/components/AuthButton'),
  { ssr: false }
);

interface Props {}

const Nav: React.FC<Props> = () => {
  return (
    <nav className='h-[var(--nav-height)] pr-2 pl-4 z-[110] bg-black/30 backdrop-blur-sm border-slate-800 border rounded-full w-full xl:max-w-3xl flex items-center justify-center fixed top-2 max-w-[95vw]'>
      <Link className='font-semibold text-sm mr-auto' href='/'>
        Ensolvers Notes
      </Link>
      <AuthButton />
    </nav>
  );
};

export default Nav;
