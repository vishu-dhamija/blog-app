// // components/PostForm.tsx
// import React, { useState } from "react";

// interface PostFormProps {
//   onSubmit: (data: { title: string; body: string }) => void;
//   initialData?: { title: string; body: string };
// }

// const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData }) => {
//   const [title, setTitle] = useState(initialData?.title || "");
//   const [body, setBody] = useState(initialData?.body || "");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({ title, body });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-gray-700 font-medium">Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-medium">Body</label>
//         <textarea
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           className="w-full p-2 border rounded"
//           rows={5}
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default PostForm;
// components/PostForm.tsx

'use client';

import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (data: { title: string; body: string }) => Promise<void>;
  initialData?: { title: string; body: string };
  loading: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData = { title: '', body: '' }, loading }) => {
  const [title, setTitle] = useState(initialData.title);
  const [body, setBody] = useState(initialData.body);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  );
};

export default PostForm;
