'use client'

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text === "") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.creator.username.includes(text) || post.tag.includes(text)||post.prompt.includes(text)
        )
      );
    }
  };

  const handleTagClick = (tag)=>{
    setSearchText(tag)
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.creator.username.includes(tag) ||
          post.tag.includes(tag) ||
          post.prompt.includes(tag)
      )
    );
  }


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      
      if (!response.ok) {
        throw new Error("Data not found");
      }
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data); // Set filteredPosts initially to all posts
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for tag or a username" 
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
}

export default Feed;