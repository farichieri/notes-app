'use client';
import { IoSync } from 'react-icons/io5';
import { useResyncCategoriesMutation } from '..';
import { RoundButton, Spinner } from '@/components';

interface Props {}

const ReSyncCategories: React.FC<Props> = () => {
  const [resyncCategories, { isLoading }] = useResyncCategoriesMutation();

  return (
    <div>
      <RoundButton onClick={() => resyncCategories()}>
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

export default ReSyncCategories;
