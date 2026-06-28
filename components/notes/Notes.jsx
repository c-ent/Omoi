"use client";

import { useState } from "react";
import Image from "next/image";
import NoteCard from "@components/notes/NoteCard";
import NoteSkeleton from "@components/notes/NoteSkeleton";
import NotesToolbar from "@components/notes/NotesToolbar";
import ErrorBanner from "@components/ui/ErrorBanner";
import { useMultiSelect } from "@hooks/useMultiSelect";
import { useNoteModal } from "@components/notes/NoteModalProvider";

export default function Notes({ data, handleEdit, handleTrash, loading, error, onDismissError }) {
  const { openCreateNote } = useNoteModal();
  const { selectedIds, selectAll, toggleSelect, handleSelectAll, clearSelection } =
    useMultiSelect(data);
  const [bulkError, setBulkError] = useState("");

  const handleTrashSelected = async () => {
    const notesToTrash = selectedIds
      .map((noteId) => data.find((item) => item._id === noteId))
      .filter(Boolean);

    const results = await Promise.allSettled(notesToTrash.map((note) => handleTrash(note)));
    const failedCount = results.filter(
      (result) => result.status === "rejected" || result.value === false
    ).length;

    if (failedCount > 0) {
      setBulkError(
        failedCount === 1
          ? "1 note could not be moved to trash."
          : `${failedCount} notes could not be moved to trash.`
      );
    }

    clearSelection();
  };

  const displayError = bulkError || error;

  return (
    <div className="w-full">
      <ErrorBanner
        message={displayError}
        onDismiss={() => {
          setBulkError("");
          onDismissError?.();
        }}
      />

      <header className="notes_page_header">
        <div className="notes_page_heading">
          <h1 className="notes_page_title">Notes</h1>
          <p className="notes_page_subtitle">
            {loading ? "Loading…" : `${data.length} ${data.length === 1 ? "note" : "notes"}`}
          </p>
        </div>
        <button type="button" onClick={openCreateNote} className="notes_create_btn notes_create_btn_mobile">
          <span className="notes_create_icon" aria-hidden="true">+</span>
          <span className="notes_create_label">New note</span>
        </button>
      </header>

      {!loading && data.length > 0 && (
        <NotesToolbar
          selectedCount={selectedIds.length}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          actions={[{ label: "Move to trash", onClick: handleTrashSelected, variant: "danger" }]}
        />
      )}

      {loading ? (
        <NoteSkeleton />
      ) : data.length === 0 ? (
        <div className="notes_empty">
          <Image
            src="/assets/images/logobw.svg"
            alt=""
            width={48}
            height={48}
            className="object-contain opacity-40"
          />
          <p className="notes_empty_title">No notes yet</p>
          <p className="notes_empty_text">Notes you create will show up here.</p>
          <button type="button" onClick={openCreateNote} className="black_btn mt-4">
            Create your first note
          </button>
        </div>
      ) : (
        <div className="notes_layout">
          {data.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              handleEdit={() => handleEdit(note)}
              isSelected={selectedIds.includes(note._id)}
              onToggleSelect={() => toggleSelect(note._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
