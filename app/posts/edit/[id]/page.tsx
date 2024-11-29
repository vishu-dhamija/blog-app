'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPostById, updatePost } from '../../../services/api'; // Corrected import path
import PostForm from '../../../components/PostForm'; // Corrected import path
import { Post } from '../../../types/types'; // Corrected import path

const EditPostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadPost = async () => {
      const postData = await fetchPostById(Number(params.id));
      setPost(postData);
      setLoading(false);
    };
    loadPost();
  }, [params.id]);

  const handleUpdatePost = async (data: { title: string; body: string }) => {
    setSaving(true);
    try {
      await updatePost(Number(params.id), data);
      alert('Post updated successfully!');
      router.push(`/posts/${params.id}`); // Navigate to post details
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <PostForm
        onSubmit={handleUpdatePost}
        initialData={{ title: post.title, body: post.body }}
        loading={saving}
      />
    </div>
  );
};

export default EditPostPage;
