"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get Firebase ID token
      const token = await user.getIdToken();

      // Store it (e.g. in localStorage or a secure cookie)
      localStorage.setItem("adminToken", token);

      // Redirect
      router.push("/admin");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
