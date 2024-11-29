'use client';

import React, { useState, useEffect } from 'react';
import { fetchPostById } from '../../services/api'; 
import { Post } from '../../types/types'; 

const PostDetailsPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const postId = Number(params.id);
      
      if (postId) {
        const postData = await fetchPostById(postId);
        setPost(postData);
      }
      setLoading(false);
    };

    // Fetch the post details and handle loading state
    fetchData();
  }, [params]); // Re-run when params change

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetailsPage;
