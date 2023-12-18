'use client';
import { Button } from '@/components';
import { Modal } from '@/features/modals';
import { useState } from 'react';
import { IoCreate } from 'react-icons/io5';
import { NoteInput, useCreateNoteMutation } from '..';
import { useGetCategoriesQuery } from '@/features/categories';

interface Props {}

const CreateNote: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [createNote, { isLoading, error }] = useCreateNoteMutation();
  const [input, setInput] = useState<NoteInput>({
    title: '',
    content: '',
    isArchived: false,
    categoryIds: [],
  });
  const { data: categories } = useGetCategoriesQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createNote({
        title: input.title,
        content: input.content,
        isArchived: input.isArchived,
        categoryIds: input.categoryIds,
      }).unwrap();
      setOpen(false);
      setInput({ title: '', content: '', isArchived: false, categoryIds: [] });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  return (
    <>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className='text-primary border w-[400px] border-slate-800 flex overflow-auto flex-col max-w-[95vw] bg-secondary rounded-lg bg-slate-900'>
            <div className='p-4 sm:p-10'>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col'>
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
                <div className='flex'>
                  <Button variant='primary' isLoading={isLoading}>
                    Create
                  </Button>
                </div>
              </form>
              {error && (
                <div className='text-red-500 text-sm text-center'>
                  {('data' in error && error.data.message) ||
                    'Unexpected Error'}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
      <Button variant='success' onClick={() => setOpen(true)}>
        <h1>Create Note</h1>
        <IoCreate className='text-xl' />
      </Button>
    </>
  );
};

export default CreateNote;
