import { Category } from '@/features/categories';

export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  categoryIds: number[];
}

export interface NoteInput {
  title: string;
  content: string;
  isArchived: boolean;
  categoryIds: number[];
}
