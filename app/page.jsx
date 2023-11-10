"use client"
import { useState, useEffect} from 'react';
import { signIn , useSession, getProviders} from 'next-auth/react'; //To use next-auth
import { useRouter } from 'next/navigation';

import Profile from "@components/Profile";
import Image from 'next/image';

const MyProfile = () => {
    const router = useRouter();
    const { data: session,status } = useSession();
    const [ posts, setPosts ] = useState([])
    const [providers, setProviders] = useState(null);

    //if the component is rendered do this
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          const filteredPosts = data.filter(post => post.isShown === 1);
          setPosts(filteredPosts);
        };
    
        if (session?.user.id) fetchPosts();

        const setUpProviders = async () => {
          const response = await getProviders();
          setProviders(response);
      }

      setUpProviders();
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
        return <div className="flex items-center justify-center pt-20">
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
        return <div className="flex flex-col items-center justify-center pt-20">
          <Image 
                    src="/assets/images/blob.jpg"
                    alt="Logo"
                    width={300}
                    height={300}
                    className="object-contain"
                />
          {providers &&
                    Object.values(providers).map((provider)=>(
                        <button
                            type="button"
                            key="provider.name"
                            onClick = {() => signIn(provider.id)}
                            className= "black_btn mt-2"
                        >
                            Sign in
                        </button>
                    ))}
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