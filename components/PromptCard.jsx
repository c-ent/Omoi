"use client";
import {useState} from 'react';
import Image from "next/image";
import {useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({post, handleTagClick,onCardClick, isSelected,onToggleSelect,handleEdit,  handleDelete,handleTrash, handleRestore}) => {
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
    <div className={`prompt_card ${isSelected ? 'border-2 border-black' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

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

      <p className="note_heading mb-4">{post.prompt}</p>
      <p className="font-inter mb-8 text-m cursor-pointer" >
          {post.tag}
      </p>

      {isHovered && pathName === "/" &&(
        <div className='prompt_card_button'>
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
    
      {session?.user.id === post.creator._id && pathName === "/deletednotes" && (
        <div className='mt-5 flex-center gap-4 '>

          <button onClick={handleRestore} >
            <Image 
                  src="/assets/icons/restore.png"
                  alt="edit"
                  width={30}
                  height={30}
                  className="object-contain"
              />
          </button>

          <button onClick={handleDelete} >
            <Image 
                  src="/assets/icons/delete.png"
                  alt="edit"
                  width={25}
                  height={25}
                  className="object-contain"
              />
          </button>
          
        </div>
      )}
    </div>
  )
}

export default PromptCard