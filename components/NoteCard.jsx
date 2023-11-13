"use client";
import {useState} from 'react';
import Image from "next/image";
import {useSession } from "next-auth/react";
import { usePathname} from "next/navigation";

const NoteCard = ({note, isSelected,onToggleSelect,handleEdit,  handleDelete, handleRestore}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
        className={`note_card  hover:shadow-xl hover:shadow-gray-300
        ${isSelected ? 'border-2 border-black' : ''} 
        ${ note.bgColor === 'bg-red-200' ? 'bg-red-200' : note.bgColor === 'bg-blue-200' ? 'bg-blue-200' : note.bgColor === 'bg-green-200' ? 'bg-green-200':'bg-yellow-200'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >

      {isHovered || isSelected ? (
        <label className="checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="hidden"
          />
          <Image
          src={isSelected ? '/assets/icons/checked.svg' : '/assets/icons/uncheck.svg'}
          alt="Custom Checkbox"
          width={30}
          height={30}
          className="object-contain"
        />
        </label>
      ): null}

      <p className="note_heading mb-4">{note.noteTitle}</p>
      <p className="font-inter mb-8 text-m cursor-pointer" >
          {note.noteBody}
      </p>


      {isHovered && pathName === "/" &&(
        <div className='note_card_button'>
          <button onClick={handleEdit} >
            <Image 
                  src="/assets/icons/pen.svg"
                  alt="edit"
                  width={30}
                  height={30}
                  className="object-contain"
              />
          </button>
        </div>
      )}
    
      {session?.user.id === note.creator._id && pathName === "/deletednotes" && (
        <div className='mt-5 flex-center gap-4 '>

          <button onClick={handleRestore} >
            <Image 
                  src="/assets/icons/restore.svg"
                  alt="edit"
                  width={30}
                  height={30}
                  className="object-contain"
              />
          </button>

          <button onClick={handleDelete} >
            <Image 
                  src="/assets/icons/delete.svg"
                  alt="edit"
                  width={30}
                  height={30}
                  className="object-contain"
              />
          </button>
          
        </div>
      )}
    </div>
  )
}

export default NoteCard