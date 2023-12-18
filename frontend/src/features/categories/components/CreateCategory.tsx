'use client';
import { Button } from '@/components';
import { Modal } from '@/features/modals';
import { useState } from 'react';
import { IoCreate } from 'react-icons/io5';
import { CategoryInput, useCreateCategoryMutation } from '..';

interface Props {}

const CreateCategory: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
  const [input, setInput] = useState<CategoryInput>({
    name: '',
    color: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory({
        name: input.name,
        color: input.color || '#000000',
      }).unwrap();
      setOpen(false);
      setInput({ name: '', color: '' });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className='text-primary sm:max-w-sm border border-slate-800 flex overflow-auto flex-col max-w-[95vw] bg-secondary rounded-lg bg-slate-900'>
            <div className='p-4 sm:p-10'>
              <form onSubmit={handleSubmit}>
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
        <h1>Create Category</h1>
        <IoCreate className='text-xl' />
      </Button>
    </>
  );
};

export default CreateCategory;
