"use client"
import { useState, useEffect} from 'react';
import { signIn , useSession, getProviders} from 'next-auth/react'; //To use next-auth
import { useRouter } from 'next/navigation';
import Notes from "@components/Notes";
import Image from 'next/image';

const MyNotes = () => {
    const router = useRouter();
    const { data: session,status } = useSession();
    const [ notes, setNotes ] = useState([])
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/notes`);
          const data = await response.json();
          const filteredNotes = data.filter(note => note.isShown === 1);
          setNotes(filteredNotes);
          setLoading(false);
        };
        
        if (session?.user.id) fetchNotes();

        const setUpProviders = async () => {
        const response = await getProviders();
        setProviders(response);
      }
      setUpProviders();
      }, [session?.user.id]);
    
    const handleEdit = (note) => {
        router.push(`/update-note?id=${note._id}`)
    }

    const handleTrash = async (note) => {
          // console.log(note)
          try {
              await fetch(`/api/note/${note._id}`, {
              method: "PATCH",
              body: JSON.stringify({
                      noteTitle:note.noteTitle,
                      noteBody:note.noteBody,
                      bgColor:note.bgColor,
                      isShown: 0,
              })
          })
          setNotes((prevNotes) => {
            // Filter out the notes with the specified note._id
            const filteredNotes = prevNotes.filter((item) => item._id !== note._id);
            return filteredNotes;
          });
        } catch (error) {
          console.log(error);
        }
    };

      if (status === "loading") {
        return <div className="flex items-center justify-center pt-24 w-full h-full">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full animate-pulse bg-yellow-300"></div>
                    <div className="w-3 h-3 rounded-full animate-pulse bg-yellow-300"></div>
                    <div className="w-3 h-3 rounded-full animate-pulse bg-yellow-300"></div>
                  </div>
                </div>
      }

      if (status === "unauthenticated") {
        return <div className="flex flex-col items-center pt-20 min-h-screen" 
        style={{
          position: 'relative'}}
        >
          <div
           style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/assets/images/app.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(15px)',
            zIndex: -1
        }}
          
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
            Object.values(providers).map((provider)=>(
                <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="font-semibold"
                >
                    Sign in to add Notes
                </button>
            ))}
           
    </div>
    
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

export default MyNotes

