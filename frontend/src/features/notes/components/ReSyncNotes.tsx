'use client';
import { IoSync } from 'react-icons/io5';
import { useResyncNotesMutation } from '..';
import { RoundButton, Spinner } from '@/components';

interface Props {}

const ReSyncNotes: React.FC<Props> = () => {
  const [resyncNotes, { isLoading }] = useResyncNotesMutation();

  return (
    <div>
      <RoundButton onClick={() => resyncNotes()}>
        {isLoading ? (
          <div className='animate-spin'>
            <IoSync className='text-xl' />
          </div>
        ) : (
          <IoSync className='text-xl' />
        )}
      </RoundButton>
    </div>
  );
};

export default ReSyncNotes;
