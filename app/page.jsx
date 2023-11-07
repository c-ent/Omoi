"use client"
import { useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from "@components/Profile";
import Image from 'next/image';

const MyProfile = () => {
    const router = useRouter();
    const { data: session,status } = useSession();
    const [ posts, setPosts ] = useState([])

    //if the component is rendered do this
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          const filteredPosts = data.filter(post => post.isShown === 1);
          setPosts(filteredPosts);
        };
    
        if (session?.user.id) fetchPosts();
      }, [session?.user.id]);
    
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleTrash = async (post) => {
          try {
              await fetch(`/api/prompt/${post._id}`, {
              method: "PATCH",
              body: JSON.stringify({
                prompt:post.prompt,
                    tag:post.tag,
                  isShown: 0,
              })
          })
          setPosts((prevPosts) => {
            // Filter out the post with the specified post._id
            const filteredPosts = prevPosts.filter((item) => item._id !== post._id);
            return filteredPosts;
          });
        } catch (error) {
          console.log(error);
        }
      };


      if (status === "loading") {
        return <div className="flex items-center justify-center h-screen">
          <Image 
                    src="/assets/images/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain animate-spin"
                />
        </div>
      }

      if (status === "unauthenticated") {
        return <div className="flex flex-col items-center justify-center h-screen">
          <Image 
                    src="/assets/images/logoplain.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                />
          <p className='sidebar_text'>Sign In to Add Notes</p>
        </div>
      }
    return (
        <Profile
          data={posts}
          handleEdit={handleEdit}
          handleTrash={handleTrash}
        />
      );
    };

export default MyProfile