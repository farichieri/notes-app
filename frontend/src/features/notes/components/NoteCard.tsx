'use client';
import { useState } from 'react';
import { Note } from '..';
import NoteDetail from './NoteDetail';

interface Props {
  note: Note;
}

const NoteCard: React.FC<Props> = ({ note }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <NoteDetail onClose={() => setOpen(false)} note={note} />}
      <div
        className='border rounded-lg  text-left p-6 border-slate-800 bg-slate-500/50'
        onClick={() => setOpen(true)}
      >
        <div className='mb-2 flex-wrap flex gap-2'>
          {note.categories.map((category) => (
            <div
              key={category.id}
              style={{ backgroundColor: category.color }}
              className='h-3 w-10 rounded-full'
            ></div>
          ))}
        </div>
        <h1 className='text-base font-semibold border-b w-full'>
          {note.title}
        </h1>
        <p className='text-sm text-slate-200 py-2'>{note.content}</p>
      </div>
    </>
  );
};

export default NoteCard;
