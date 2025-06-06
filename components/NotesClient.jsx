'use client'

import { useRouter } from 'next/navigation';
import { signIn, useSession, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Notes from "@components/Notes";
import Image from 'next/image';

const NotesClient = ({ initialNotes, initialProviders }) => {
  const router = useRouter();
  const { status } = useSession();
  const [notes, setNotes] = useState(initialNotes || []);
  const [providers, setProviders] = useState(initialProviders || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleEdit = (note) => {
    router.push(`notes/update-note?id=${note._id}`)
  }

  const handleTrash = async (note) => {
    try {
      await fetch(`/api/note/${note._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          noteTitle: note.noteTitle,
          noteBody: note.noteBody,
          bgColor: note.bgColor,
          isShown: 0,
        })
      });
      setNotes((prevNotes) => {
        const filteredNotes = prevNotes.filter((item) => item._id !== note._id);
        return filteredNotes;
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center pt-24 w-full h-full">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full animate-pulse bg-yellow-300"></div>
          <div className="w-3 h-3 rounded-full animate-pulse bg-yellow-300"></div>
          <div className="w-3 h-3 rounded-full animate-pulse bg-yellow-300"></div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div 
        className="flex flex-col items-center pt-20 min-h-screen" 
        style={{ position: 'relative' }}
      >
        <div

        >
        </div>
        <div className='bg-yellow-200'>
          <Image 
            src="/assets/images/blob.svg"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
    
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className="font-semibold"
            >
              Sign in to add Notes
            </button>
          ))
        }
      </div>
    );
  }
  
  return (
    <Notes
      data={notes}
      handleEdit={handleEdit}
      handleTrash={handleTrash}
      setLoading={setLoading}
      loading={loading}
    />
  );
};

export default NotesClient;