"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Content is required"),
});

interface PostFormProps {
  onSubmit: (title: string, body: string) => void;
  defaultValues?: { title: string; body: string };
}

interface PostFormValues {
  title: string;
  body: string;
}

const PostForm = ({
  onSubmit,
  defaultValues = { title: "", body: "" },
}: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.title, data.body))}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          {...register("body")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your post..."
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default PostForm;
