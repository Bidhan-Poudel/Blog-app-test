"use client";

import { usePosts } from "@/hooks";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

const ViewPost = () => {
  const params = useParams();
  const id = Number(params.id);
  const { posts, loading, error } = usePosts();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const post = posts.find((p) => p.id === id);
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
          {post.body}
        </p>
      </article>
    </div>
  );
};

export default ViewPost;
