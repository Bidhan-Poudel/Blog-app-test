"use client";

import { useEffect, useState } from "react";
import { usePosts } from "@/hooks";
import { useRouter, useParams } from "next/navigation";
import PostForm from "@/components/PostForm";
import Loader from "@/components/Loader";

const EditPost = () => {
  const params = useParams();
  const id = Number(params.id);
  const { posts, editPost } = usePosts();
  const router = useRouter();

  const [defaultValues, setDefaultValues] = useState({ title: "", body: "" });

  useEffect(() => {
    const post = posts.find((p) => p.id === id);
    if (post) {
      setDefaultValues({ title: post.title, body: post.body });
    }
  }, [posts, id]);

  const handleSubmit = async (title: string, body: string) => {
    await editPost(id, title, body);
    router.push("/dashboard");
  };

  if (!defaultValues.title) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">✏️ Edit Post</h1>
        <PostForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </div>
    </div>
  );
};

export default EditPost;
