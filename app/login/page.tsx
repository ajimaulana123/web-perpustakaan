"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import Navbar from "../components/Navbar";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal login');
      }

      // Redirect after successful login
      router.push(redirectPath);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Gagal login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Masuk ke Akun Anda</h1>
              <p className="text-gray-600 mt-2">
                Masuk untuk mengakses fitur peminjaman buku
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded bg-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 pl-11 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Masukkan email"
                    required
                  />
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pl-11 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    placeholder="Masukkan password"
                    required
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Belum punya akun?{" "}
                <a href="/register" className="text-blue-600 hover:text-blue-800">
                  Daftar Sekarang
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
} 