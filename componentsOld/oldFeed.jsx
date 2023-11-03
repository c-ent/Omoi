"use client";
import { useState, useEffect, Suspense } from 'react';
import PromptCard from "./PromptCard"
import Loading from '@app/loading';

//
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}

        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  // const [isLoading, setIsLoading] = useState(false);
  const handlerSearchChange = (e) => {
  }
  
  //run this every time the component is rendered
  useEffect(() => {
    // setIsLoading(true);
    //fetch data from backend
    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        console.log(data)
        setPosts(data);
        // setIsLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="seatch somthing"
          value={searchText}
          onChange={handlerSearchChange}
          required
          className="search_input peer">
        </input>
      </form>

      {/* {isLoading ? <Loading /> : */}
      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />  
      {/* } */}
    </section>
  )
}

export default Feed