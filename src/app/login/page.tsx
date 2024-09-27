"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      const access_token = data?.token;
      const user_role = data?.user?.role;
      const user_id = data?.user?.id;

      if (access_token) {
        setCookie("authToken", access_token, { path: "/" });
        setCookie("userRole", user_role, { path: "/" });
        setCookie("userId", user_id, { path: "/" });
      }

      router.push("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Hi! Nice to meet You again!
        </h1>

        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700">What’s your email?</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg bg-gray-100 placeholder-gray-400 focus:outline-none"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Your password?</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg bg-gray-100 placeholder-gray-400 focus:outline-none"
              placeholder="if you forget, kindly click the link below!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right text-gray-500">
            <a href="/forgot-password" className="underline">
              Having trouble? Click here!
            </a>
          </div>

          <button
            type="submit"
            className="mt-6 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all w-full"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
