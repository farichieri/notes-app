'use client';
import { useGetCategoriesQuery } from '..';
import { sortByCreatedAt } from '@/utils';
import { Spinner } from '@/components';
import CategoryCard from './CategoryCard';

interface Props {}

const Categories: React.FC<Props> = () => {
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <Spinner />;

  return (
    <div className='flex flex-col w-full max-w-sm space-y-4'>
      {sortByCreatedAt(data)?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
