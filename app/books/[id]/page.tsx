"use client";

import Image from "next/image";
import { BookOpen, Star, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  status: string;
  rating: number;
  stock: number;
  category: {
    name: string;
  };
}

export default function BookDetail() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${params.id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include'
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        if (data.isLoggedIn) {
          setUserId(data.user.id);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    if (params.id) {
      fetchBook();
      checkLoginStatus();
    }
  }, [params.id]);

  const handleBorrow = async () => {
    try {
      const loginCheck = await fetch('/api/auth/check', {
        credentials: 'include'
      });
      const loginData = await loginCheck.json();

      if (!loginData.isLoggedIn) {
        router.push(`/login?redirect=/books/${params.id}`);
        return;
      }

      const response = await fetch('/api/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          bookId: params.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal meminjam buku');
      }

      alert('Buku berhasil dipinjam!');
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gagal meminjam buku');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold">Buku tidak ditemukan</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="mb-4">
                <span className="text-blue-600 font-medium">{book.category.name}</span>
                <h1 className="text-3xl font-bold text-gray-800 mt-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mt-1">{book.author}</p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-gray-700">{book.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>14 hari peminjaman</span>
                </div>
              </div>

              <div className="prose prose-blue mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Deskripsi</h3>
                <p className="text-gray-600">{book.description}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-medium">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    book.status === "AVAILABLE" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {book.status === "AVAILABLE" ? "Tersedia" : "Dipinjam"}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-800 font-medium">Stok</span>
                  <span className="text-blue-800">{book.stock} buku</span>
                </div>
              </div>

              <button
                onClick={handleBorrow}
                disabled={book.status !== "AVAILABLE"}
                className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-medium
                  ${book.status === "AVAILABLE"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  } transition-colors`}
              >
                <BookOpen className="w-5 h-5" />
                {book.status === "AVAILABLE" ? "Pinjam Buku" : "Tidak Tersedia"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 