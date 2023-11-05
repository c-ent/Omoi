import PromptCard from './PromptCard';
// import { getServerSession } from 'next-auth';

// async function fetchPosts() {
//     try{
//         const response = await fetch('http://localhost:3000/api/prompt', { cache: 'no-store' });
//         return response.json();
//     } catch(error) {
//         console.log(error);
//     }
// }

const fetchPosts = async () => {
  try {
      const response = await fetch('http://localhost:3000/api/prompt', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        const notes = data.filter(post => post.isShown === 1);
        return notes;
      } else {
          throw new Error('Request failed with status ' + response.status);
      }
  } catch (error) {
      // Handle network errors or other exceptions here
      console.log(error);
      // You can refresh the page or return a placeholder div or any other action you want here
      // For example, refreshing the page:
      // window.location.reload();
  }
}

async function getData() {
  const response = await fetch('https://notes-next-js-eight.vercel.app/api/prompt', { cache: 'no-store' });
  const data = await response.json();
  const notes = await data.filter(post => post.isShown === 1);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
  return notes;
  
}


async function Feed() {
  // const session = await getServerSession();
  // if (!session) {
  //   return <p>Access Denied</p>
  // }
    const posts = await getData();
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