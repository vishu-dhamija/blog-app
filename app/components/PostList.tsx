'use client';

import React from 'react';
import { Post } from '../types/types';

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => Promise<void>;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p>{post.body.slice(0, 100)}...</p>
          <div className="flex space-x-2 mt-2">
            <a href={`/posts/${post.id}`} className="text-blue-500">View More</a>
            <button
              onClick={() => onDelete(post.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
