"use client"
import { useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import PromptCard from '@components/PromptCard';
import Link from 'next/link';

const deletednote = () => {
    const { data: session,status } = useSession();
    const [ posts, setPosts ] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            const filteredPosts = data.filter(post => post.isShown === 0);
            setPosts(filteredPosts);
        };
        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

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
            const allPostIds = posts.map((post) => post._id);
            setSelectedItems(allPostIds);
        } else {
            setSelectedItems([]);
        }
        setSelectAll(!selectAll);
    };


    const handleDelete = async (post) => {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
            });
            setPosts((prevPosts) => {
                const filteredPosts = prevPosts.filter((item) => item._id !== post._id);
                return filteredPosts;
            });
          } catch (error) {
            console.log(error);
          }
    };

    const restoreNote = async (post) => {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        prompt:post.prompt,
                        tag:post.tag,
                        isShown: 1,
                    })
                })

            setPosts((prevPosts) => {
                const filteredPosts = prevPosts.filter((item) => item._id !== post._id);
                return filteredPosts;
            });
            } catch (error) {
                console.log(error);
            }
        
    };

    // const restoreAllNotes = async () => {
    //         try {
    //             const updatedPosts = [];
    //             for (const post of posts) {
    //                 await fetch(`/api/prompt/${post._id}`, {
    //                     method: "PATCH",
    //                     body: JSON.stringify({
    //                         prompt: post.prompt,
    //                         tag: post.tag,
    //                         isShown: 1,
    //                     })
    //                 });
    //                 if (post.isShown !== 1) {
    //                     updatedPosts.push(post);
    //                 }
    //             }
    //             const filteredPosts = posts.filter((post) => !updatedPosts.includes(post));
    //             setPosts(filteredPosts);
    //         } catch (error) {
    //             console.log(error);
    //         }
    // };
        
    // const emptyTrash = async () => {
    //     const hasConfirmed = confirm("Are you sure you want to delete all posts?");
    //     if (hasConfirmed) {
    //         try {
    //             for (const post of posts) {
    //                 await fetch(`/api/prompt/${post._id.toString()}`, {
    //                     method: "DELETE",
    //                 });
    //             }
    //             setPosts([]); // Clear the posts array
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // };

    const handleDeleteSelectedItems = () => {
        selectedItems.forEach((postId) => {
        handleDelete(posts.find((post) => post._id === postId));
        console.log(postId)
        });
        setSelectedItems([]);
    };
    
    const handleRestoreSelectedItems = () => {
        selectedItems.forEach((postId) => {
        restoreNote(posts.find((post) => post._id === postId));
        console.log(postId)
        });
        setSelectedItems([]);
    };
    

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    return (
        <section className='w-full'>
        <Link href='/profile' className="red_btn w-10">Back to Profile</Link>
        <h1 className='head_text text-left mb-6'>
        <span className=''>Trash</span>
        </h1>

        <div className='flex space-x-1'>
            <div className="outline_btn">{selectedItems.length} Selected</div>
            <button onClick={handleSelectAll} className="black_btn">
            {selectAll ? 'Deselect All' : 'Select All'}
            </button>
            {selectedItems.length > 0 && (
                 <div className='flex space-x-1'>
                <button onClick={handleDeleteSelectedItems} className="black_btn">
                Delete Selected
                </button>
                <button onClick={handleRestoreSelectedItems} className="black_btn">
                Restore Selected
                </button>
                </div>
            )}
        </div>

        <div className='mt-10 prompt_layout'>
            {posts.map((post) => (
            <PromptCard
                key={post._id}
                post={post}
                handleDelete={() => handleDelete(post)}
                handleRestore={() => restoreNote(post)}
                onToggleSelect={() => toggleSelect(post._id)}
                isSelected={selectedItems.includes(post._id)}
            />
        ))}
        </div>
        </section>
    );
    };

export default deletednote