"use client";
import React, { useEffect, useState } from "react";
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
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/prompt?search=${searchText}`);
      const data = await response.json();
      setPosts(data);
    };
    const time = setTimeout(() => {
      fetchPost();
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [searchText]);

  return (
    <section className="feed ">
      <form className="relative w-full flex flex-center">
        <input
          type="text"
          placeholder="Search for tag or a usename"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
}

export default Feed;
