'use client';

import React, { useState, useEffect } from 'react';
import { fetchPostById } from '../../services/api'; 
import { Post } from '../../types/types';

const PostDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Resolve the `params` Promise
      setPostId(Number(resolvedParams.id));
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const postData = await fetchPostById(postId);
        setPost(postData);
      }
      setLoading(false);
    };

    // Fetch the post details and handle loading state
    if (postId !== null) {
      fetchData();
    }
  }, [postId]);

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
