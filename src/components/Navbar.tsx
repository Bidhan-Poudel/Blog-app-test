"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {useThemeStore, useAuthStore} from "@/stores";
import { useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { theme, setTheme, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme) setTheme(storedTheme);
  }, [setTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Blog<span className="text-blue-500">App</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm hover:underline">
                Dashboard
              </Link>
              <Link href="/dashboard/create" className="text-sm hover:underline">
                Create
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-md px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
              >
                Register
              </Link>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="rounded-md border px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
