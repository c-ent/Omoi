import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import NotesClient from '@components/NotesClient';
import { getProviders } from "next-auth/react";

const MyNotes = async () => {
  const session = await getServerSession(authOptions);
  let notes = [];
  const providers = await getProviders();

  if (session?.user?.id) {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${session.user.id}/notes`, {
        cache: 'no-store'
      });
      
      console.log(`Response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        notes = data.filter(note => note.isShown === 1);
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  }

  return <NotesClient initialNotes={notes} initialProviders={providers} />;
};

export default MyNotes;