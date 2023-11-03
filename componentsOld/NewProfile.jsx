import { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import PromptCard from "./PromptCard";

async function fetchPosts(userId) {
  try{
      const response = await fetch(`http://localhost:3000/api/users/${userId}/posts`);
      const data = await response.json();
      const posts = data;
      return posts;
  } catch(error) {
      console.log(error);
  }
}


async function NewProfile ({ name, desc , data, handleEdit }) {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id;
  if (!session) {
    return <p>Access Denied</p>
  }

  
const posts = await fetchPosts(userId);
console.log(posts);

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
      </div>
    </section>


  );
};

export default NewProfile;
