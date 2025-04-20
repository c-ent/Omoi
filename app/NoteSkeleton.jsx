import React from 'react';

const NoteCardSkeleton = () => (
<div className="note_card bg-gray-100 flex items-center justify-start animate-pulse ">
  <div className="note-skeleton p-2 rounded w-full animate-pulse">
    <div className="h-4 w-3/5 bg-gray-300 mb-4"></div>
    <div className="h-4 bg-gray-200 mb-1"></div>
    <div className="h-4 bg-gray-200 mb-1"></div>
    <div className="h-4 bg-gray-200 mb-1"></div>
    <div className  ="h-4 bg-gray-200 mb-1"></div>
  </div>
</div>
);


const NoteSkeleton = () => {
  return (
    <div className='notes_layout'>
      <NoteCardSkeleton />
      <NoteCardSkeleton />
      <NoteCardSkeleton />

      <NoteCardSkeleton />
      <NoteCardSkeleton />
      <NoteCardSkeleton />

      <NoteCardSkeleton />
      <NoteCardSkeleton />
      <NoteCardSkeleton />

      <NoteCardSkeleton />
      <NoteCardSkeleton />
      <NoteCardSkeleton />


      </div>
  );
};

export default NoteSkeleton;
