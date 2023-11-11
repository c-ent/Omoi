
import Link from "next/link";
import { useState } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('bg-yellow-200');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setPost({ ...post, bgColor: color })
    console.log(post.bgColor)
    setIsMenuOpen(false);
  };


  
  return (
    <section className='w-full max-w-full flex-start flex-col'>

      <form onSubmit={handleSubmit} className={`prompt_card ${selectedColor}`}>

<textarea  rows="2" className="my-2 font-satoshi note_heading"
  value={post.prompt}
  onChange={(e) => setPost({ ...post, prompt: e.target.value })}
  placeholder='Title...'
  required
/>
<textarea  rows="8" className="font-inter text-sm cursor-pointer"  placeholder="body..." 
  value={post.tag}
  onChange={(e) => setPost({ ...post, tag: e.target.value })}
  type='text'
  required
/>

<div className='relative inline-block'>
      <button
        type='button'
        className=' border-2 border-black rounded-full text-white'
        
        onClick={toggleMenu}
      >
        {selectedColor ? (
          <div
          className={`w-6 h-6 rounded-full ${selectedColor}`}
          
        >
          </div>
          
        ) : (
          'Select Color'
        )}
      </button>
      
      {isMenuOpen && (
        <div className='flex absolute mt-2 w-40 border border-gray-300 rounded-md shadow-md z-10 overflow-hidden'>
          <button
            className='w-full h-12 hover:bg-gray-100 '
            onClick={() => handleColorSelect('bg-red-200')}
          >
            <div className='w-full h-full bg-red-200'></div>
          </button>
          <button
            className='w-full h-12 hover:bg-gray-100'
            onClick={() => handleColorSelect('bg-yellow-200')}
          >
            <div className='w-full h-full bg-yellow-200'></div>
          </button>

          <button
            className='w-full h-12 hover:bg-gray-100'
            onClick={() => handleColorSelect('bg-blue-200')}
          >
            <div className='w-full h-full bg-blue-200'></div>
          </button>
        </div>
      )}
</div>

        <div className='flex-end mx-3 mb-5 gap-4'>

          <button
            type='submit'
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;