"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NoteForm from "@components/notes/NoteForm";
import LoadingDots from "@components/ui/LoadingDots";
import SignInPrompt from "@components/auth/SignInPrompt";
import ErrorBanner from "@components/ui/ErrorBanner";
import { DEFAULT_NOTE_COLOR } from "@lib/note-validation";

export default function EditNoteForm({ noteId, onSuccess, onCancel }) {
  const { status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [note, setNote] = useState({ noteTitle: "", noteBody: "", bgColor: DEFAULT_NOTE_COLOR });

  useEffect(() => {
    if (!noteId) return;

    setLoading(true);
    setError("");

    fetch(`/api/note/${noteId}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Failed to load note");
        }
        return res.json();
      })
      .then((data) => {
        setNote({
          noteTitle: data.noteTitle,
          noteBody: data.noteBody,
          bgColor: data.bgColor || DEFAULT_NOTE_COLOR,
        });
      })
      .catch((loadError) => {
        setError(loadError.message ?? "Failed to load note.");
      })
      .finally(() => setLoading(false));
  }, [noteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/note/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        const updatedNote = await response.json();
        onSuccess?.(updatedNote);
        return;
      }

      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Could not update note.");
    } catch {
      setError("Could not update note.");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return <LoadingDots variant="inline" />;
  }

  if (status === "unauthenticated") {
    return <SignInPrompt message="Sign in to edit notes" />;
  }

  return (
    <>
      <ErrorBanner message={error} onDismiss={() => setError("")} />
      <NoteForm
        type="Update"
        note={note}
        setNote={setNote}
        submitting={submitting}
        handleSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </>
  );
}
