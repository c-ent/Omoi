import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import NotesClient from '@components/NotesClient';

const MyNotes = async () => {
  // Get session server-side using getServerSession instead of useSession hook
  const session = await getServerSession(authOptions);
  let notes = [];
  
  console.log(`Session data: ${JSON.stringify(session)}`);
  console.log(`Session user ID: ${session?.user?.id}`);
  // Fetch notes on server if user is logged in
  if (session?.user?.id) {
    try {
      console.log(`Fetching notes for user ${session.user.id}`);
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

  // Pass the pre-fetched notes to client component
  return <NotesClient initialNotes={notes} />;
};

export default MyNotes;