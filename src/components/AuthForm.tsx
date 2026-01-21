"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormValues, AuthFormProps } from "@/types";
import { authSchema } from "@/utils/authSchema";
import { useAuthStore } from "@/stores";



const AuthForm = ({ onSubmit, buttonText }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(authSchema),
  });
 const clearError = useAuthStore((s) => s.clearError);
 useEffect(() => {
    clearError();
  }, [clearError]);
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({email: data.email, password: data.password})
      )}
      className="w-full max-w-md space-y-5 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Please wait..." : buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
