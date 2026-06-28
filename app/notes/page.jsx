import { getServerSession } from "next-auth/next";
import { authOptions } from "@lib/auth";
import { getNotesByUserId } from "@lib/notes";
import NotesClient from "@components/notes/NotesClient";

export default async function NotesPage() {
  const session = await getServerSession(authOptions);
  const notes = session?.user?.id
    ? await getNotesByUserId(session.user.id, { isDeleted: false })
    : [];

  return <NotesClient initialNotes={notes} />;
}
