import { api } from '@/services';
import { Note, NoteInput } from '../types';

export const notesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => ({
        url: `notes`,
        method: 'GET',
      }),
      providesTags: ['Notes'],
    }),
    createNote: builder.mutation<Note, NoteInput>({
      query: (note) => ({
        url: `notes`,
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Notes'],
    }),
    updateNote: builder.mutation<Note, { id: number; patch: NoteInput }>({
      query: ({ id, patch }) => ({
        url: `notes/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
    resyncNotes: builder.mutation<void, void>({
      query: () => ({
        url: `notes`,
        method: 'GET',
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useResyncNotesMutation,
} = notesApi;
