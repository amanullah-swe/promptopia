"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
function MyProfile() {
  const [posts, setPosts] = useState([]);
  const handleDelete = () => {};
  const handleEdit = () => {};
  const handleTagClick = () => {};

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    const fetchPost = async (params) => {
      const response = await fetch(
        "/api/users/" + session?.user?.id + "/posts"
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, [session?.user?.id]);
  return (
    <Profile
      name={"My Page"}
      desc={"welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  );
}

export default MyProfile;
