"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NoteCard from "@components/notes/NoteCard";
import NoteSkeleton from "@components/notes/NoteSkeleton";
import NotesToolbar from "@components/notes/NotesToolbar";
import ErrorBanner from "@components/ui/ErrorBanner";
import LoadingDots from "@components/ui/LoadingDots";
import SignInPrompt from "@components/auth/SignInPrompt";
import { useMultiSelect } from "@hooks/useMultiSelect";

export default function TrashNotes({ initialNotes = [] }) {
  const { status } = useSession();
  const [notes, setNotes] = useState(initialNotes);
  const [error, setError] = useState("");
  const [bulkError, setBulkError] = useState("");
  const { selectedIds, selectAll, toggleSelect, handleSelectAll, clearSelection } =
    useMultiSelect(notes);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleDelete = async (note) => {
    try {
      const response = await fetch(`/api/note/${note._id}`, { method: "DELETE" });
      if (response.ok) {
        setNotes((prev) => prev.filter((item) => item._id !== note._id));
        return true;
      }

      setError("Could not delete note.");
      return false;
    } catch {
      setError("Could not delete note.");
      return false;
    }
  };

  const restoreNote = async (note) => {
    try {
      const response = await fetch(`/api/note/${note._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: false }),
      });

      if (response.ok) {
        setNotes((prev) => prev.filter((item) => item._id !== note._id));
        return true;
      }

      setError("Could not restore note.");
      return false;
    } catch {
      setError("Could not restore note.");
      return false;
    }
  };

  const handleDeleteSelected = async () => {
    const notesToDelete = selectedIds
      .map((noteId) => notes.find((item) => item._id === noteId))
      .filter(Boolean);

    const results = await Promise.allSettled(notesToDelete.map((note) => handleDelete(note)));
    const failedCount = results.filter(
      (result) => result.status === "rejected" || result.value === false
    ).length;

    if (failedCount > 0) {
      setBulkError(
        failedCount === 1
          ? "1 note could not be deleted."
          : `${failedCount} notes could not be deleted.`
      );
    }

    clearSelection();
  };

  const handleRestoreSelected = async () => {
    const notesToRestore = selectedIds
      .map((noteId) => notes.find((item) => item._id === noteId))
      .filter(Boolean);

    const results = await Promise.allSettled(notesToRestore.map((note) => restoreNote(note)));
    const failedCount = results.filter(
      (result) => result.status === "rejected" || result.value === false
    ).length;

    if (failedCount > 0) {
      setBulkError(
        failedCount === 1
          ? "1 note could not be restored."
          : `${failedCount} notes could not be restored.`
      );
    }

    clearSelection();
  };

  if (status === "loading") return <LoadingDots />;
  if (status === "unauthenticated") return <SignInPrompt />;

  const displayError = bulkError || error;

  return (
    <section className="w-full">
      <ErrorBanner
        message={displayError}
        onDismiss={() => {
          setBulkError("");
          setError("");
        }}
      />

      <header className="notes_page_header">
        <div>
          <h1 className="notes_page_title">Trash</h1>
          <p className="notes_page_subtitle">
            {`${notes.length} deleted ${notes.length === 1 ? "note" : "notes"}`}
          </p>
        </div>
      </header>

      {notes.length > 0 && (
        <NotesToolbar
          selectedCount={selectedIds.length}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          actions={[
            { label: "Restore", onClick: handleRestoreSelected },
            { label: "Delete forever", onClick: handleDeleteSelected, variant: "danger" },
          ]}
        />
      )}

      {notes.length === 0 ? (
        <div className="notes_empty">
          <Image
            src="/assets/icons/trash.svg"
            alt=""
            width={40}
            height={40}
            className="object-contain opacity-30"
          />
          <p className="notes_empty_title">Trash is empty</p>
          <p className="notes_empty_text">Deleted notes will appear here.</p>
        </div>
      ) : (
        <div className="notes_layout">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              handleDelete={() => handleDelete(note)}
              handleRestore={() => restoreNote(note)}
              onToggleSelect={() => toggleSelect(note._id)}
              isSelected={selectedIds.includes(note._id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
