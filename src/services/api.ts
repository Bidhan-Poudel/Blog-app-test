const API_BASE = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const createPost = async (title: string, body: string) => {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId: 1 }),
  });
  if (!res.ok) throw new Error("Failed to create");
  return res.json();
};

export const updatePost = async (id: number, title: string, body: string) => {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
};

export const deletePost = async (id: number) => {
  const res = await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
};