"use client";

import Image from "next/image";
import { Search, Filter, BookOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useBooks } from '../hooks/useBooks'

function BooksContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const { books, loading, error } = useBooks(searchQuery);
  const router = useRouter();

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBorrow = async (bookId: string) => {
    try {
      // Cek login status - redirect ke login jika belum login
      const isLoggedIn = false; // Ganti dengan actual auth check
      if (!isLoggedIn) {
        router.push('/login?redirect=/books');
        return;
      }

      const userId = "user-id"; // Ganti dengan actual user ID dari auth
      const response = await fetch('/api/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId,
          userId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Gagal meminjam buku');
      }

      // Sukses meminjam
      alert('Buku berhasil dipinjam!');
      // Refresh data buku
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gagal meminjam buku');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
      <Navbar />
      {/* Search and Filter Section */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm p-4 sticky top-16 z-10 border-b border-blue-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Cari buku..."
              className="w-full px-6 py-3 rounded-full border-2 border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm pl-14"
            />
            <Search className="absolute left-5 top-3.5 w-5 h-5 text-orange-500" />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            Error loading books. Please try again.
          </div>
        ) : books.length === 0 ? (
          <div className="text-center text-white py-8">
            <p className="text-xl">Tidak ada buku yang ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="group bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all">
                <div className="relative aspect-w-3 aspect-h-4">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-sm backdrop-blur-md ${
                      book.status === "AVAILABLE" 
                        ? "bg-green-100/90 text-green-800" 
                        : "bg-red-100/90 text-red-800"
                    }`}>
                      {book.status === "AVAILABLE" ? "Tersedia" : "Dipinjam"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-blue-600 mb-1">{book.category.name}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm mb-4">
                    {"★".repeat(Math.floor(book.rating))}
                    <span className="text-gray-600 ml-1">({book.rating})</span>
                  </div>
                  <button 
                    onClick={() => handleBorrow(book.id)}
                    disabled={book.status !== "AVAILABLE"}
                    className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium
                      ${book.status === "AVAILABLE" 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800" 
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      } transition-all`}
                  >
                    <BookOpen className="w-4 h-4" />
                    {book.status === "AVAILABLE" ? "Pinjam Buku" : "Tidak Tersedia"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function Books() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    }>
      <BooksContent />
    </Suspense>
  );
} 