import { AppLayout } from '@/components';
import { Categories, CreateCategory } from '@/features/categories';
import { ReSyncNotes } from '@/features/notes';

export default function App() {
  return (
    <AppLayout>
      <div className='flex text-center items-center justify-center gap-4 flex-col'>
        <div className='flex w-full items-center justify-between'>
          <ReSyncNotes />
          <CreateCategory />
        </div>
        <Categories />
      </div>
    </AppLayout>
  );
}
