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
    <div className={"prompt_card"} onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>

      {isHovered || isSelected ? (
        <div className="checkbox flex justify-between items-start gap-5">
          <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect} //there are 2 functions inside this function
          className='w-6 h-6 accent-yellow-100'
        />
        </div>
      ): null}

      

      <p className="my-2 font-satoshi note_heading">{post.prompt}</p>
      <p 
        className="font-inter text-sm cursor-pointer" 
      >
          {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" &&(
        <div className='mt-5 flex-end gap-4 pt-3'>
          <button onClick={handleEdit} >
            <Image 
                  src="/assets/icons/pencil.png"
                  alt="edit"
                  width={40}
                  height={40}
                  className="object-contain"
              />
          </button>

          <button onClick={handleTrash} >
            <Image 
                  src="/assets/icons/trash-bin.png"
                  alt="edit"
                  width={40}
                  height={40}
                  className="object-contain"
              />
          </button>
        
        </div>
      )}
      {/* <button onClick={toggleDiv}>Toggle Div</button>
      {toggleDropdown && (
        <div className="">
          This is the content of the div.
        </div>
      )} */}

      {session?.user.id === post.creator._id && pathName === "/profile/deletednotes" && (
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