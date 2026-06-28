import { getServerSession } from "next-auth/next";
import { authOptions } from "@lib/auth";
import { getNotesByUserId } from "@lib/notes";
import TrashNotes from "@components/notes/TrashNotes";

export default async function TrashPage() {
  const session = await getServerSession(authOptions);
  const notes = session?.user?.id
    ? await getNotesByUserId(session.user.id, { isDeleted: true })
    : [];

  return <TrashNotes initialNotes={notes} />;
}
