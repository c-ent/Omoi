
import Link from "next/link";
import PromptCard from "./PromptCard";
import { getServerSession } from 'next-auth';

import User from '@models/user';   //importing the user model


const fetchPosts = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}/posts`);
  const data = await response.json();
  const posts = data.filter(post => post.isShown === 1);
  return posts;
};

async function Profile({ name, desc, handleEdit, handleTrash }) {
  const session = await getServerSession();
  const sessionUser = await User.findOne({email: session.user.email});
  const id = sessionUser._id.toString();


  if (!session){
    return <p>Access Denied</p>
  }  else{
    console.log(session)
  }
  const posts = await fetchPosts(id);


  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className=''>{name} Notes</span>
      </h1>

      <p className='desc text-left'>{desc}</p>

      <Link href='/profile/deletednotes' className="black_btn">Deleted Notes</Link>
      <div className='mt-10 prompt_layout'>
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            // handleEdit={() => handleEdit && handleEdit(post)}
            // handleTrash={() => handleTrash && handleTrash(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
