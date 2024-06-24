"use client"
import { useState, useEffect} from 'react';
import { signIn , useSession, getProviders} from 'next-auth/react'; //To use next-auth
import NoteCard from '@components/NoteCard';
import Link from 'next/link';
import NoteSkeleton from '@app/NoteSkeleton';
import Image from 'next/image';

const deletednote = () => {
    const { data: session,status } = useSession();
    const [ notes, setNotes ] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/notes`);
            const data = await response.json();
            const filteredNotes = data.filter(note => note.isShown === 0);
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

    //Multi Select
    const toggleSelect = (noteId) => {
        if (selectedItems.includes(noteId)) {
        setSelectedItems(selectedItems.filter((id) => id !== noteId));
        } else {
        setSelectedItems([...selectedItems, noteId]);
        }
    };

    // Select All 
    const handleSelectAll = () => {
        if (!selectAll) {
            const allNoteIds = notes.map((note) => note._id);
            setSelectedItems(allNoteIds);
        } else {
            setSelectedItems([]);
        }
        setSelectAll(!selectAll);
    };


    const handleDelete = async (note) => {
            try {
                await fetch(`/api/note/${note._id.toString()}`, {
                    method: "DELETE",
            });
            setNotes((prevNotes) => {
                const filteredNotes = prevNotes.filter((item) => item._id !== note._id);
                return filteredNotes;
            });
          } catch (error) {
            console.log(error);
          }
    };

    const restoreNote = async (note) => {
        console.log(note)
            try {
                await fetch(`/api/note/${note._id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        noteTitle:note.noteTitle,
                        noteBody:note.noteBody,
                        bgColor:note.bgColor,
                        isShown: 1,
                    })
                })

            setNotes((prevNotes) => {
                const filteredNotes = prevNotes.filter((item) => item._id !== note._id);
                return filteredNotes;
            });
            } catch (error) {
                console.log(error);
            }
        
    };

    const handleDeleteSelectedItems = () => {
        selectedItems.forEach((noteId) => {
        handleDelete(notes.find((note) => note._id === noteId));
        console.log(noteId)
        });
        setSelectedItems([]);
    };
    
    const handleRestoreSelectedItems = () => {
        selectedItems.forEach((noteId) => {
        restoreNote(notes.find((note) => note._id === noteId));
        console.log(noteId)
        });
        setSelectedItems([]);
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
        return <div className="flex flex-col items-center justify-center pt-20">
        <Image 
          src="/assets/images/blob.svg"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      {providers &&
        Object.values(providers).map((provider)=>(
          <button
            type="button"
            key="provider.name"
            onClick = {() => signIn(provider.id)}
            className= "font-semibold"
          >
            Sign in to add Notes
          </button>
                ))}
    </div>
    }

    return (
        <section className='w-full '>
        {/* <Link href='/' className="red_btn w-10">
            Back to Notes
        </Link> */}
         <div className="flex justify-between items-baseline  mb-6">
            <h1 className='head_text text-left mb-6'>
                Trash
            </h1>
        </div>
        <div className='flex space-x-1'>
            <div className="outline_btn">{selectedItems.length} Selected</div>
            <button onClick={handleSelectAll} className="black_btn">
            {selectAll ? 'Deselect All' : 'Select All'}
            </button>
            {selectedItems.length > 0 && (
                 <div className='flex space-x-1'>
                <button onClick={handleDeleteSelectedItems} className="black_btn">
                Delete Selected
                </button>
                <button onClick={handleRestoreSelectedItems} className="black_btn">
                Restore Selected
                </button>
                </div>
            )}
        </div>

        <div>
            { loading ? <NoteSkeleton /> : notes.length === 0 ? 
            <div className="pt-16 flex flex-col items-center">
                <Image 
                    src="/assets/images/logobw.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />
                <p className="text-gray-500 ">Trash notes appear here</p>
            </div> :  null }

            <div className='notes_layout'>
                {notes.map((note) => (
                <NoteCard
                    key={note._id}
                    note={note}
                    handleDelete={() => handleDelete(note)}
                    handleRestore={() => restoreNote(note)}
                    onToggleSelect={() => toggleSelect(note._id)}
                    isSelected={selectedItems.includes(note._id)}
                />
                ))}
            </div>
        </div>
        </section>
    );
    };

export default deletednote