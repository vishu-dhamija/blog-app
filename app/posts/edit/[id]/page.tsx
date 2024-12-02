'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPostById, updatePost } from '../../../services/api'; // Adjusted import paths
import PostForm from '../../../components/PostForm'; // Adjusted import paths
import { Post } from '../../../types/types'; // Adjusted import paths

const EditPostPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);
  const router = useRouter();

  // Resolve `params` asynchronously
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setPostId(Number(resolvedParams.id));
    };
    resolveParams();
  }, [params]);

  // Load the post once `postId` is available
  useEffect(() => {
    const loadPost = async () => {
      if (postId) {
        try {
          const postData = await fetchPostById(postId);
          setPost(postData);
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadPost();
  }, [postId]);

  const handleUpdatePost = async (data: { title: string; body: string }) => {
    if (!postId) return;

    setSaving(true);
    try {
      await updatePost(postId, data);
      alert('Post updated successfully!');
      router.push(`/posts/${postId}`); // Navigate to post details
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
