"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
function MyProfile() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");
    if (!hasConfirmed) return;
    try {
      const response = await fetch("/api/prompt/" + post?._id, {
        method: "DELETE",
      });
      if (response.ok) {
        // filtere the post
        setPosts((prev) => prev.filter((p) => p._id !== post._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

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
      name={"My"}
      desc={"welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  );
}

export default MyProfile;
