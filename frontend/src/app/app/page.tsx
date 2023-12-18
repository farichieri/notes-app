import { AppLayout } from '@/components';
import { Notes, ReSyncNotes } from '@/features/notes';
import CreateNote from '@/features/notes/components/CreateNote';

export default function App() {
  return (
    <AppLayout>
      <div className='flex text-center items-center justify-center gap-4 flex-col'>
        <div className='flex w-full items-center justify-between'>
          <ReSyncNotes />
          <CreateNote />
        </div>
        <Notes />
      </div>
    </AppLayout>
  );
}
