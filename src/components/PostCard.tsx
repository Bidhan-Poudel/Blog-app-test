import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      onDelete(post.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {post.body}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex gap-3">
          <Link href={`/dashboard/${post.id}`} className="text-blue-600 hover:underline">
            View
          </Link>
          <Link href={`/dashboard/${post.id}/edit`} className="text-green-600 hover:underline">
            Edit
          </Link>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
