'use client';

import React, { useEffect, useState } from 'react';

import { fetchPosts, createPost, deletePost } from './services/api'; // Corrected import path
import PostForm from './components/PostForm'; // Corrected import path
import PostList from './components/PostList'; // Corrected import path
import { Post } from './types/types'; // Corrected import path

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostLoading, setNewPostLoading] = useState(false);
  
  // Fetch posts on page load
  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };

    loadPosts();
  }, []);

  const handleCreatePost = async (newPost: { title: string; body: string }) => {
    setNewPostLoading(true);
    try {
      const createdPost = await createPost(newPost);
      setPosts((prevPosts) => [createdPost, ...prevPosts]); // Add the new post to the list
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post.');
    } finally {
      setNewPostLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Remove the post from the list
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post.');
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Manager</h1>

      {/* Form for creating a new post */}
      <PostForm onSubmit={handleCreatePost} loading={newPostLoading} />

      {/* List of all posts */}
      <PostList posts={posts} onDelete={handleDeletePost} />

    </div>
  );
};

export default HomePage;
