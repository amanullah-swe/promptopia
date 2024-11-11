"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import Profile from "@components/Profile";
function MyProfile1({ params }) {
  const [posts, setPosts] = useState([]);
  const router = useRouter(); // Use useRouter from next/router
  const searchParams = useSearchParams();
  const username = searchParams.get("username"); //use Access username from query parameters
  const { id } = React.use(params);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!hasConfirmed) return;
    try {
      const response = await fetch("/api/prompt/" + post?._id, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== post._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, [id]);

  return (
    <Profile
      name={username}
      desc={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default function MyProfile({ params }) {
  return (
    <Suspense>
      <MyProfile1 params={params} />
    </Suspense>
  );
}
