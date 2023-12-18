'use client';

import { Modal } from '@/features/modals';
import {
  Note,
  NoteInput,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '..';
import { useEffect, useState } from 'react';
import { Button } from '@/components';
import { useGetCategoriesQuery } from '@/features/categories';
import { getNoteCategoriesIds } from '@/utils';

interface Props {
  onClose: () => void;
  note: Note & { categoryIds: number[] };
}

const NoteDetail: React.FC<Props> = ({ onClose, note }) => {
  const [input, setInput] = useState<NoteInput>(note);
  const [updateNote, { error, isLoading: isLoadingUpdate }] =
    useUpdateNoteMutation();
  const [deleteNote, { isLoading: isLoadingDelete }] = useDeleteNoteMutation();
  const { data: categories } = useGetCategoriesQuery();

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateNote({
        id: note.id,
        patch: {
          title: input.title,
          content: input.content,
          isArchived: input.isArchived,
          categoryIds: input.categoryIds,
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
      await deleteNote({
        id: note.id,
      }).unwrap();
      onClose();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleCategoryIds = (id: number) => {
    if (input.categoryIds?.includes(id)) {
      setInput((prev) => ({
        ...prev,
        categoryIds: input.categoryIds?.filter((c) => c !== id),
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        categoryIds: [...(prev.categoryIds || []), id],
      }));
    }
  };

  useEffect(() => {
    const categoryIds = getNoteCategoriesIds(note);
    setInput((prev) => ({ ...prev, categoryIds }));
  }, [categories, note]);

  return (
    <Modal onClose={onClose}>
      <div className='text-primary border w-[400px] border-slate-800 flex overflow-auto flex-col max-w-[95vw] bg-secondary rounded-lg bg-slate-900'>
        <div className='p-4 sm:p-10'>
          <form onSubmit={handleSubmitUpdate}>
            <div className='flex flex-col w-full'>
              <textarea
                name='title'
                id='title'
                placeholder='Title'
                className='bg-slate-800 rounded-lg p-2 text-sm text-primary'
                value={input.title}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col mt-4'>
              <textarea
                name='content'
                id='content'
                placeholder='Content'
                rows={5}
                className='bg-slate-800 rounded-lg p-2 text-sm text-primary'
                value={input.content}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-between mt-4'>
              <label htmlFor='isArchived' className='text-sm'>
                Archive
              </label>
              <input
                type='checkbox'
                name='isArchived'
                id='isArchived'
                className='rounded-lg p-2 text-sm text-primary'
                checked={input.isArchived}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    isArchived: e.target.checked,
                  }))
                }
              />
            </div>
            <div className='w-fit mt-4 flex flex-wrap gap-1'>
              {categories?.map((category) => (
                <button
                  key={category.id}
                  style={{ backgroundColor: category.color }}
                  className={`text-slate-400 py-1 px-2 text-sm rounded-full duration-200 font-semibold ${
                    input.categoryIds?.includes(category.id)
                      ? 'opacity-100'
                      : 'opacity-30'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryIds(category.id);
                  }}
                >
                  {category.name}
                </button>
              ))}
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
        </div>
      </div>
    </Modal>
  );
};

export default NoteDetail;
