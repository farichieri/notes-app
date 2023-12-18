import { api } from '@/services';
import { Category, CategoryInput } from '..';

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: `categories`,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<Category, CategoryInput>({
      query: (category) => ({
        url: `categories`,
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<
      Category,
      { id: number; patch: Partial<Category> }
    >({
      query: ({ id, patch }) => ({
        url: `categories/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
    resyncCategories: builder.mutation<void, void>({
      query: () => ({
        url: `categories`,
        method: 'GET',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useResyncCategoriesMutation,
} = categoriesApi;
