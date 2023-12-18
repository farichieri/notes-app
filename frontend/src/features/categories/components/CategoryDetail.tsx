'use client';

import { Modal } from '@/features/modals';
import {
  Category,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '..';
import { useState } from 'react';
import { Button } from '@/components';

interface Props {
  onClose: () => void;
  category: Category;
}

const CategoryDetail: React.FC<Props> = ({ onClose, category }) => {
  const [input, setInput] = useState<Category>(category);
  const [updateCategory, { error, isLoading: isLoadingUpdate }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { error: deleteError, isLoading: isLoadingDelete }] =
    useDeleteCategoryMutation();

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateCategory({
        id: category.id,
        patch: {
          name: input.name,
          color: input.color,
        },
      }).unwrap();
      onClose();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async () => {
    try {
      await deleteCategory({
        id: category.id,
      }).unwrap();
      onClose();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className='text-primary sm:max-w-sm border border-slate-800 flex overflow-auto flex-col max-w-[95vw] bg-secondary rounded-lg bg-slate-900'>
        <div className='text-primary sm:max-w-sm border border-slate-800 flex overflow-auto flex-col max-w-[95vw] bg-secondary rounded-lg bg-slate-900'>
          <div className='p-4 sm:p-10'>
            <form onSubmit={handleSubmitUpdate}>
              <div className='flex flex-col'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='bg-slate-800 rounded-lg p-2 text-sm text-primary'
                  value={input.name}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col mt-4'>
                <input
                  type='text'
                  name='color'
                  id='color'
                  placeholder='Color'
                  className='bg-slate-800 rounded-lg p-2 text-sm text-primary'
                  value={input.color}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button variant='primary' isLoading={isLoadingUpdate}>
                  Save
                </Button>
              </div>
            </form>
            <div className='flex flex-col gap-3 mt-3'>
              <Button
                variant='danger'
                isLoading={isLoadingDelete}
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button variant='cancel' onClick={() => onClose()}>
                Cancel
              </Button>
            </div>
            {error && (
              <div className='text-red-500 text-sm text-center'>
                {('data' in error && error.data.message) || 'Unexpected Error'}
              </div>
            )}
            {deleteError && (
              <div className='text-red-500 text-sm text-center'>
                {('data' in deleteError && deleteError.data.message) ||
                  'Unexpected Error'}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryDetail;
