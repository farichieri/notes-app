import { Footer, Nav } from '..';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex bg-slate-950 min-h-screen flex-col items-center justify-between pt-[var(--nav-height)]'>
      <Nav />
      <main className='my-24'>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
