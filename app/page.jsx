"use client"
import { useState, useEffect} from 'react';
import { signIn , useSession, getProviders} from 'next-auth/react'; //To use next-auth
import { useRouter } from 'next/navigation';

import Profile from "@components/Profile";
import Image from 'next/image';
import NoteSkeleton from './NoteSkeleton';

const MyProfile = () => {
    const router = useRouter();
    const { data: session,status } = useSession();
    const [ posts, setPosts ] = useState([])
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true);

    //if the component is rendered do this
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          const filteredPosts = data.filter(post => post.isShown === 1);
          setPosts(filteredPosts);
          setLoading(false);
        };
        
        if (session?.user.id) fetchPosts();

        const setUpProviders = async () => {
          const response = await getProviders();
          setProviders(response);
      }

      setUpProviders();
      
      }, [session?.user.id]);

      // if (loading) return <NoteSkeleton />;
      // if (!posts || posts.length < 1) return 'No data';
    
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
        return <div className="flex items-center justify-center pt-24 w-full h-full">
          <div class="flex gap-2">
    <div class="w-5 h-5 rounded-full animate-pulse bg-orange-400"></div>
    <div class="w-5 h-5 rounded-full animate-pulse bg-orange-400"></div>
    <div class="w-5 h-5 rounded-full animate-pulse bg-orange-400"></div>
</div>
        </div>
      }

      if (status === "unauthenticated") {
        return <div className="flex flex-col items-center justify-center pt-20">
          {/* <Image 
                    src="/assets/images/blob.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                /> */}
          {providers &&
                    Object.values(providers).map((provider)=>(
                        <button
                            type="button"
                            key="provider.name"
                            onClick = {() => signIn(provider.id)}
                            className= "black_btn mt-2"
                        >
                            Sign in to add Notes
                        </button>
                    ))}
        </div>
      }
    return (
        <Profile
          data={posts}
          handleEdit={handleEdit}
          handleTrash={handleTrash}
          setLoading={setLoading}
          loading={loading}
          
        />
      );
    };

export default MyProfile

