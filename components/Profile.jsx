import Link from "next/link";
import PromptCard from "./PromptCard";
import { useState, useEffect } from 'react'; //To use state and effect hooks
import Image from "next/image";
import NoteSkeleton from "@app/NoteSkeleton";

const Profile = ({ desc, data, handleEdit, handleTrash, loading }) => {
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
      <div className='w-full'>
        <div className="flex justify-between items-baseline  mb-6">
        <h1 className='head_text'>
           Notes
        </h1>

        {/* <Link href='/deletednotes'>
          <Image 
                      src="/assets/icons/add.svg"
                      alt="edit"
                      width={40}
                      height={40}
                      className="object-contain"
                      
            />
            Add
        </Link> */}

        <Link href="/create-prompt" className="flex gap-2 mb-8 items-center">
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
        
        <div className='prompt_layout'>
  {loading ? (
    <NoteSkeleton />
  ) : data.length > 0 ? (
    // Map over the data and render PromptCard components
    data.map(post => (
      <PromptCard
        key={post._id}
        post={post}
        handleEdit={() => handleEdit && handleEdit(post)}
        handleTrash={() => handleTrash && handleTrash(post)}
        isSelected={selectedItems.includes(post._id)}
        onToggleSelect={() => toggleSelect(post._id)}
      />
    ))
  ) : (
    <p>No notes found.</p>
  )}
</div>

      </div>
  );
};

export default Profile;

