'use client';
import { useState } from 'react';
import { FilterNotes, NoteCard } from '.';
import { Note, useGetNotesQuery } from '..';
import { getNoteCategoriesIds, getUniqueCategories } from '@/utils';
import { Category } from '@/features/categories';

interface Props {}

const ARCHIVED_FILTERS = {
  active: 'Active',
  all: 'All',
  archived: 'Archived',
};

const Notes: React.FC<Props> = () => {
  const { data } = useGetNotesQuery();
  const [archiveFilter, setArchiveFilter] = useState(ARCHIVED_FILTERS.all);
  const [categoryFilterId, setCategoryFilterId] = useState<number | null>(null);

  const filteredNotes = data
    ?.filter((note: Note) => {
      if (archiveFilter === ARCHIVED_FILTERS.all) return true;
      if (archiveFilter === ARCHIVED_FILTERS.active) return !note.isArchived;
      if (archiveFilter === ARCHIVED_FILTERS.archived) return note.isArchived;
      return true;
    })
    .filter((note) => {
      if (!categoryFilterId) return true;
      return getNoteCategoriesIds(note).includes(categoryFilterId);
    });

  const categories = getUniqueCategories(data);

  return (
    <div className='w-full'>
      <FilterNotes
        archiveFilter={archiveFilter}
        setArchiveFilter={setArchiveFilter}
        categoryFilterId={categoryFilterId}
        setCategoryFilterId={setCategoryFilterId}
        categories={categories}
        archiveFilterOptions={ARCHIVED_FILTERS}
      />
      <div className='grid mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {filteredNotes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
