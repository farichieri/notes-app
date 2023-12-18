import { FaNoteSticky } from 'react-icons/fa6';
import { BiSolidLabel } from 'react-icons/bi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<Props> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const ROUTES = [
    {
      name: 'Notes',
      path: '/app',
      icon: <FaNoteSticky />,
    },
    {
      name: 'Categories',
      path: '/app/categories',
      icon: <BiSolidLabel />,
    },
  ];
  return (
    <>
      {isSidebarOpen && (
        <div
          className={`bg-black/50 inset-0 absolute sm:hidden`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        ></div>
      )}
      <div
        className={`fixed duration-300 transition-all left-0 border-r border-slate-800 bg-slate-900/90 z-[100] backdrop-blur-sm h-full top-0 w-48 px-4 py-[var(--nav-height)] ${
          isSidebarOpen ? 'left-0' : 'left-[-12rem]'
        }`}
      >
        <div className='pt-4 gap-2 flex flex-col'>
          {ROUTES.map((route) => (
            <Link
              href={route.path}
              key={route.name}
              className={`flex items-center py-2 px-4 duration-100 hover:bg-slate-800/40 rounded-full space-x-4 ${
                pathname === route.path
                  ? 'bg-slate-800/40 border-slate-800'
                  : ''
              }`}
            >
              <div className='text-2xl'>{route.icon}</div>
              <div>{route.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
