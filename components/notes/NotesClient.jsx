"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Notes from "@components/notes/Notes";
import LoadingDots from "@components/ui/LoadingDots";
import SignInPrompt from "@components/auth/SignInPrompt";
import { useNoteModal } from "@components/notes/NoteModalProvider";

function NotesClientInner({ initialNotes }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const { registerOnCreated, registerOnUpdated, openCreateNote, openEditNote } = useNoteModal();
  const [notes, setNotes] = useState(initialNotes || []);
  const [error, setError] = useState("");

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  useEffect(() => {
    return registerOnCreated((newNote) => {
      setNotes((prev) => [newNote, ...prev]);
    });
  }, [registerOnCreated]);

  useEffect(() => {
    return registerOnUpdated((updatedNote) => {
      setNotes((prev) =>
        prev.map((item) => (item._id === updatedNote._id ? updatedNote : item))
      );
    });
  }, [registerOnUpdated]);

  useEffect(() => {
    const shouldCreate = searchParams.get("new") === "1";
    const editId = searchParams.get("edit");

    if (shouldCreate) {
      openCreateNote();
      router.replace("/notes");
    } else if (editId) {
      openEditNote(editId);
      router.replace("/notes");
    }
  }, [searchParams, openCreateNote, openEditNote, router]);

  const handleEdit = (note) => {
    openEditNote(note._id);
  };

  const handleTrash = async (note) => {
    try {
      const response = await fetch(`/api/note/${note._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDeleted: true }),
      });

      if (response.ok) {
        setNotes((prev) => prev.filter((item) => item._id !== note._id));
        return true;
      }

      setError("Could not move note to trash.");
      return false;
    } catch {
      setError("Could not move note to trash.");
      return false;
    }
  };

  if (status === "loading") return <LoadingDots />;
  if (status === "unauthenticated") return <SignInPrompt />;

  return (
    <Notes
      data={notes}
      handleEdit={handleEdit}
      handleTrash={handleTrash}
      error={error}
      onDismissError={() => setError("")}
    />
  );
}

export default function NotesClient(props) {
  return (
    <Suspense fallback={<LoadingDots />}>
      <NotesClientInner {...props} />
    </Suspense>
  );
}
