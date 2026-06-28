"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NoteForm from "@components/notes/NoteForm";
import LoadingDots from "@components/ui/LoadingDots";
import SignInPrompt from "@components/auth/SignInPrompt";
import ErrorBanner from "@components/ui/ErrorBanner";
import { DEFAULT_NOTE_COLOR } from "@lib/note-validation";

export default function CreateNoteForm({ onSuccess, onCancel }) {
  const router = useRouter();
  const { status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState({ noteTitle: "", noteBody: "", bgColor: DEFAULT_NOTE_COLOR });

  if (status === "loading") return <LoadingDots variant="inline" />;
  if (status === "unauthenticated") return <SignInPrompt message="Sign in to create notes" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/note/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        const newNote = await response.json();
        if (onSuccess) {
          onSuccess(newNote);
        } else {
          router.push("/notes");
        }
        return;
      }

      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Could not create note.");
    } catch {
      setError("Could not create note.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ErrorBanner message={error} onDismiss={() => setError("")} />
      <NoteForm
        type="Create"
        note={note}
        setNote={setNote}
        submitting={submitting}
        handleSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </>
  );
}
