import PromptCard from './PromptCard';

const fetchPosts = async () => {
  try {
      const response = await fetch('http://localhost:3000/api/prompt', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        const notes = await data.filter(post => post.isShown === 1);
        return notes;
      } else {
          throw new Error('Request failed with status ' + response.status);
      }
  } catch (error) {
      console.log(error);
  }
}

// async function fetchPosts() {
//   const response = await fetch('https://notes-next-js-eight.vercel.app/api/prompt', { cache: 'no-store' });
//   const data = await response.json();
//   const notes = await data.filter(post => post.isShown === 1);
  
//   if (!response.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return notes;
  
// }


async function Feed() {
    const posts = await fetchPosts();
    return (
      <div className=' prompt_layout'>
        {posts?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
          />
        ))}
      </div>
    );
}

export default Feed;