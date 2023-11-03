
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  
  return (
    <section className='w-full max-w-full flex-start flex-col'>

      <form onSubmit={handleSubmit} className="prompt_card">

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

{/* <button
    type='submit'
    className='px-5 py-1.5 text-sm black_btn rounded-full text-white'
  >
    Create
  </button> */}


        <div className='flex-end mx-3 mb-5 gap-4'>

          <button
            type='submit'
            // disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            Create
            {/* {submitting ? `${type}ing...` : type} */}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;