"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import AuthForm from "@/components/AuthForm";
import {useAuthStore} from "@/stores";

const Register = () => {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const {error} = useAuthStore();

  useEffect(() => {
  if (isAuthenticated) {
    router.replace("/dashboard");
  }
}, [isAuthenticated, router]);

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-2 text-3xl font-bold">Create an Account</h1>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Start writing and sharing your blogs
        </p>
        <AuthForm onSubmit={register} buttonText="Register" />
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
