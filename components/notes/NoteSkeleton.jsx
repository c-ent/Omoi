const NoteCardSkeleton = () => (
  <div className="note_card bg-gray-100 flex items-center justify-start animate-pulse">
    <div className="note-skeleton p-2 rounded w-full animate-pulse">
      <div className="h-4 w-3/5 bg-gray-300 mb-4" />
      <div className="h-4 bg-gray-200 mb-1" />
      <div className="h-4 bg-gray-200 mb-1" />
      <div className="h-4 bg-gray-200 mb-1" />
    </div>
  </div>
);

export default function NoteSkeleton() {
  return (
    <div className="notes_layout">
      {Array.from({ length: 12 }).map((_, i) => (
        <NoteCardSkeleton key={i} />
      ))}
    </div>
  );
}
