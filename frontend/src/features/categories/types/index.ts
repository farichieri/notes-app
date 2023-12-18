import { Note } from '@/features/notes';

export interface Category {
  id: number;
  userId: number;
  title: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  notes: Note[];
}

export interface CategoryInput {
  name: string;
  color: string;
}
