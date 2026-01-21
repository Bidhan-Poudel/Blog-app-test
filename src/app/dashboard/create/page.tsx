"use client";

import { usePosts } from "@/hooks";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";

const CreatePost = () => {
  const { addPost } = usePosts();
  const router = useRouter();

  const handleSubmit = async (title: string, body: string) => {
    await addPost(title, body);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">✍️ Create New Post</h1>
        <PostForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreatePost;
