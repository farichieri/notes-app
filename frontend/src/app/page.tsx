import { MainLayout } from '@/components';
import { AuthModal, LoginButton } from '@/features/auth';

export default function Home() {
  return (
    <MainLayout>
      <AuthModal />
      <div className='flex text-center items-center justify-center gap-4 flex-col'>
        <h1 className='text-4xl sm:text-7xl font-bold'>
          Welcome to Ensolvers Notes
        </h1>
        <h2 className='text-xl sm:text-4xl leading-6 text-gray-400'>
          Your personal space for quick and easy note-taking
        </h2>
        <div className='my-8'>
          <LoginButton />
        </div>
      </div>
    </MainLayout>
  );
}
