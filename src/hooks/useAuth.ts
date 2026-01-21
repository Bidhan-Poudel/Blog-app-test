import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useAuthStore} from "@/stores";
import { mockLogin, mockRegister } from "@/lib/mockAuth";
import { AuthFormValues } from "@/types";

export const useAuth = () => {
  const router = useRouter();
  const { user, token, setAuth, logout, setError } = useAuthStore();

  const isAuthenticated = !!token;

const login = async ({email, password}: AuthFormValues) => {
  try {
    const { token, user } = await mockLogin(email, password);
    setAuth(user, token);
    router.push("/dashboard");
  } catch (err: any) {
    setError(err.message || "Invalid credentials");
  }
};


const register = async ({email, password}: AuthFormValues) => {
  try {
    await mockRegister(email, password);
    router.push("/auth/login");
  } catch (err: any) {
    setError(err.message || "Registration failed");
  }
};

  useEffect(() => {
  const storedAuth =
    typeof window !== "undefined"
      ? localStorage.getItem("auth")
      : null;

  if (storedAuth) {
    const { user, token } = JSON.parse(storedAuth);
    setAuth(user, token);
  }
}, [setAuth]);

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
