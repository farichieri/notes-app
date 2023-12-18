'use client';
import { useState } from 'react';
import { Category } from '..';
import CategoryDetail from './CategoryDetail';
import { FaNoteSticky } from 'react-icons/fa6';

interface Props {
  category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
  const [open, setOpen] = useState(false);
  const color = category.color;
  return (
    <>
      {open && (
        <CategoryDetail onClose={() => setOpen(false)} category={category} />
      )}
      <div
        style={{ backgroundColor: color }}
        className={`border rounded-lg flex justify-between items-center text-left px-4 py-2 w-full border-slate-800 `}
        onClick={() => setOpen(true)}
      >
        <h1 className='text-base font-bold w-full text-slate-500'>
          {category.name}
        </h1>
        <FaNoteSticky className='text-slate-500' />
      </div>
    </>
  );
};

export default CategoryCard;
