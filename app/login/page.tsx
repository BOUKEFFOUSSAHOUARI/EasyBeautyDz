"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to login");
      }

      // If successful, redirect to home page
      router.push("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-[420px] space-y-8 p-8 border border-gray-200 rounded-lg shadow-sm bg-white">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
            Log in
          </h1>
          <p className="text-[14px] text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-[13px] font-medium text-gray-700"
            >
              Email
            </label>            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-[42px] w-full rounded-[4px] border border-gray-300 px-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:ring-0 bg-white"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-[13px] font-medium text-gray-700"
            >
              Password
            </label>            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-[42px] w-full rounded-[4px] border border-gray-300 px-3 text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-gray-800 focus:ring-0 bg-white"
            />
          </div>

          <button
            type="submit"
            className="mt-6 h-[42px] w-full rounded-[4px] bg-green-500 font-medium text-white hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}