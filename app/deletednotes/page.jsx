"use client"
import { useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import NoteCard from '@components/NoteCard';
import Link from 'next/link';

const deletednote = () => {
    const { data: session,status } = useSession();
    const [ notes, setNotes ] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
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
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Sign in to add notes</p>
    }

    return (
        <section className='w-full'>
        <Link href='/' className="red_btn w-10">Back to Profile</Link>
        <h1 className='head_text text-left mb-6'>
        <span className=''>Trash</span>
        </h1>

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

        <div className='mt-10 notes_layout'>
            { loading ? <p>Loading...</p> : notes.length === 0 ? <p>No notes in trash</p> : null}
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
        </section>
    );
    };

export default deletednote