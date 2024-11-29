// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import { fetchPosts, createPost, deletePost } from "../services/api";
import { Post } from "../types/types";
import Link from "next/link";
import PostForm from "../components/PostForm";

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch posts when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetchPosts();
      setPosts(response);
    };
    loadPosts();
  }, []);

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handlePostCreated = async (newPost: { title: string; body: string }) => {
    const createdPost = await createPost(newPost);
    setPosts((prevPosts) => [createdPost, ...prevPosts]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New Post
        </Link>
      </div>
      <PostForm onSubmit={handlePostCreated} />
      <PostList posts={posts} onDelete={handleDelete} />
    </div>
  );
};

export default PostsPage;
