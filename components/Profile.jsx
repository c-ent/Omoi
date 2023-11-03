import Link from "next/link";
import PromptCard from "./PromptCard";
import { useState, useEffect } from 'react'; //To use state and effect hooks
import Image from "next/image";

const Profile = ({ name, desc, data, handleEdit, handleTrash }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    //Multi Select
    const toggleSelect = (postId) => {
        if (selectedItems.includes(postId)) {
          setSelectedItems(selectedItems.filter((id) => id !== postId));
        } else {
          setSelectedItems([...selectedItems, postId]);
        }
      };

    // Select All 
    const handleSelectAll = () => {
      if (!selectAll) {
          const allPostIds = data.map((post) => post._id);
          setSelectedItems(allPostIds);
      } else {
          setSelectedItems([]);
      }
      setSelectAll(!selectAll);
  };

    //Trash Selected Items
      const handleTrashSelectedItems = () => {
        selectedItems.forEach((postId) => {
          handleTrash(data.find((post) => post._id === postId));
          
          console.log(postId)
        });
        setSelectedItems([]);
      };

  return (
    <section className='w-full'>
      <div className="flex justify-between items-baseline  mb-6">
      <h1 className='head_text'>
        <span className=''>{name} Notes</span>
      </h1>
      <Link href='/profile/deletednotes'>
        <Image 
                    src="/assets/icons/trash-bin.png"
                    alt="edit"
                    width={40}
                    height={40}
                    className="object-contain"
                    
          />
          Trash

      </Link>
      </div>

      <div className='flex space-x-2'>
        <div className="outline_btn">{selectedItems.length} Selected</div>
        <button onClick={handleSelectAll} className="black_btn">
          {selectAll ? 'Deselect All' : 'Select All'}
        </button>
        {selectedItems.length > 0 && (
        <button onClick={handleTrashSelectedItems} className="black_btn">
          Move Selected Items to Trash
        </button>
        )}
      </div>
      
      <div className=' prompt_layout'>
        {data.map((post) => (
          
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleTrash={() => handleTrash && handleTrash(post)}
            isSelected={selectedItems.includes(post._id)}
            onToggleSelect={() => toggleSelect(post._id)}
          />
          
        ))}
      </div>
    </section>
  );
};

export default Profile;
