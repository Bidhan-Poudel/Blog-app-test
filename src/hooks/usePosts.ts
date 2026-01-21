import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchPosts, createPost, updatePost, deletePost } from "@/services/api";
import { Post } from "@/types";


export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPosts = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const addPost = async (title: string, body: string) => {
    setError(null);
    setLoading(true);
    try {
      const newPost = await createPost(title, body);
      setPosts((prev) => [...prev, newPost]);
      toast.success("Post created successfully");
    } catch (err) {
      setError("Failed to create post");
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (id: number, title: string, body: string) => {
    setError(null);
    setLoading(true);
    try {
      const updated = await updatePost(id, title, body);
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      toast.success("Post updated successfully");
    } catch (err) {
      setError("Failed to update post");
      toast.error("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted successfully");
    } catch (err) {
      setError("Failed to delete post");
      toast.error("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  return { posts, loading, error, addPost, editPost, removePost, refreshPosts };
};