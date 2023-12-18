import { Category } from '@/features/categories';
import { Note } from '@/features/notes';

type DataType<T = {}> = {
  createdAt: string;
} & T;

export const sortByCreatedAt = <T extends {}>(
  arr: DataType<T>[] | undefined
): DataType<T>[] | undefined => {
  if (!arr) return;
  const sortedArr = [...arr];
  return sortedArr.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export const getNoteCategoriesIds = (note: Note): number[] => {
  return note.categories.map((category) => category.id);
};

export const getUniqueCategories = (data: Note[] | undefined) => {
  if (!data) return [];
  const arr: Category[] = [];
  data.forEach((note: Note) => {
    note.categories.forEach((category: Category) => {
      if (!arr.find((item) => item.id === category.id)) arr.push(category);
    });
  });
  return arr;
};
