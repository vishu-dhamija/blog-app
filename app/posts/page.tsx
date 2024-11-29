'use client';

import React, { useState, useEffect } from 'react';
import { fetchPosts, deletePost } from '../services/api';
import PostList from '../components/PostList';
import { Post } from '../types/types';

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handleDeletePost = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id)); // Remove the deleted post from the state
  };

  return (
    <div className="container bg-slate-400 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Manager</h1>
      <PostList posts={posts} onDelete={handleDeletePost} />
    </div>
  );
};

export default PostsPage;
