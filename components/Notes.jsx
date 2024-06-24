import Link from "next/link";
import NoteCard from "./NoteCard";
import { useState, useEffect } from 'react'; //To use state and effect hooks
import Image from "next/image";
import NoteSkeleton from "@app/NoteSkeleton";

const Notes = ({ data, handleEdit, handleTrash, loading }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

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
          const allNoteIds = data.map((note) => note._id);
          setSelectedItems(allNoteIds);
      } else {
          setSelectedItems([]);
      }
      setSelectAll(!selectAll);
  };

    //Trash Selected Items
      const handleTrashSelectedItems = () => {
        selectedItems.forEach((noteId) => {
          handleTrash(data.find((note) => note._id === noteId));
          console.log(noteId)
        });
        setSelectedItems([]);
      };

  return (
      <div className='w-full'>
        <div className="flex justify-between items-baseline  mb-6">
        <h1 className='head_text'>
           Notes
        </h1>
        <Link href="notes/create-note" className="flex gap-2 mb-8 items-center">
                <Image 
                    src="/assets/icons/add.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />
                <p className="sidebar_text">Add</p>
            </Link>
        </div>

        <div className='flex space-x-1'>
          <p className="outline_btn">{selectedItems.length}</p>
          <button onClick={handleSelectAll} className="black_btn">
            {selectAll ? 'Deselect All' : 'Select All'}
          </button>
          {selectedItems.length > 0 && (
          <button onClick={handleTrashSelectedItems} className="black_btn">
            Trash Note
          </button>
          )}
        </div>
        
        <div >
          { loading ? <NoteSkeleton /> : 
              data.length === 0 ? <div className="pt-16 flex flex-col items-center">
              <Image 
                src="/assets/images/logobw.svg"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <p className="text-gray-500 ">Notes you add appear here</p>
          </div> : 
            null}
            <div className='notes_layout'>
              {data.map(note => (
                <NoteCard
                  key={note._id}
                  note={note}
                  handleEdit={() => handleEdit && handleEdit(note)}
                  handleTrash={() => handleTrash && handleTrash(note)}
                  isSelected={selectedItems.includes(note._id)}
                  onToggleSelect={() => toggleSelect(note._id)}
                />
              ))}
            </div>
      
        </div>
      </div>
  );
};

export default Notes;

