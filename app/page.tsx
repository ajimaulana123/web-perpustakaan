"use client";

import Image from "next/image";
import { Search, Book, User, HelpCircle, Clock, Heart, BookOpen } from "lucide-react";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FeaturedBook {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [featuredBooks, setFeaturedBooks] = useState<FeaturedBook[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Fiksi", icon: "📚" },
    { name: "Non-Fiksi", icon: "📖" },
    { name: "Sains", icon: "🔬" },
    { name: "Sejarah", icon: "🏛️" },
    { name: "Teknologi", icon: "💻" },
    { name: "Seni", icon: "🎨" },
  ];

  const newArrivals = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&h=400&auto=format&fit=crop",
      rating: 4.8,
    },
    {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300&h=400&auto=format&fit=crop",
      rating: 4.9,
    },
  ];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await fetch('/api/featured-books')
        const data = await response.json()
        setFeaturedBooks(data)
      } catch (error) {
        console.error('Error fetching featured books:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBooks()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1200&auto=format&fit=crop"
            alt="Library Hero"
            width={1200}
            height={400}
            className="w-full h-[400px] object-cover rounded-3xl brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-orange-500/30 rounded-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full px-4">
            <h1 className="text-4xl font-bold text-white mb-4">
              Temukan Buku Favorit Anda
            </h1>
            <p className="text-white/90 mb-8">
              Akses ribuan buku dari berbagai kategori
            </p>
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul buku, penulis, atau kategori..."
                  className="w-full px-6 py-4 rounded-full border-2 border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm pl-14 text-gray-900"
                />
                <button
                  type="submit"
                  className="absolute left-5 top-4 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <Search className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <BookOpen className="w-6 h-6" />, label: "Total Buku", value: "5,000+" },
            { icon: <User className="w-6 h-6" />, label: "Anggota Aktif", value: "2,500" },
            { icon: <Clock className="w-6 h-6" />, label: "Jam Operasional", value: "08:00 - 20:00" },
            { icon: <Book className="w-6 h-6" />, label: "E-Books", value: "1,000+" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="flex justify-center text-blue-600 mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Kategori</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <a
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                className="flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-orange-50 transition-all hover:scale-105"
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-blue-600 font-medium">{category.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Buku Terbaru</h2>
            <a href="/new-arrivals" className="text-blue-600 hover:text-blue-800">
              Lihat Semua →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((book) => (
              <div key={book.title} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                <div className="relative aspect-w-3 aspect-h-4">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <button className="p-2 bg-white/90 rounded-full hover:bg-white">
                      <Heart className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600 mb-2">{book.author}</p>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    {"★".repeat(Math.floor(book.rating))}
                    <span className="text-gray-600 ml-1">({book.rating})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Books */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-white mb-6">Buku Pilihan</h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {featuredBooks.map((book) => (
                <div key={book.id} className="group bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-xl transition-all">
                  <div className="aspect-w-3 aspect-h-4">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={300}
                      height={400}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-blue-600">{book.title}</h3>
                    <p className="text-gray-600 mb-4">{book.author}</p>
                    <button 
                      onClick={() => router.push(`/books/${book.id}`)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <BookOpen className="w-5 h-5" />
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="my-20 bg-blue-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Bergabung Sekarang</h2>
            <p className="mb-6 text-blue-100">
              Dapatkan akses ke ribuan buku dan e-book dengan menjadi anggota perpustakaan kami.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Daftar Keanggotaan
            </button>
          </div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden">
        <div className="flex justify-around py-3">
          <a href="/" className="flex flex-col items-center text-blue-600">
            <Book className="w-6 h-6" />
            <span className="text-xs">Beranda</span>
          </a>
          <a href="/books" className="flex flex-col items-center text-gray-600">
            <Search className="w-6 h-6" />
            <span className="text-xs">Cari</span>
          </a>
          <a href="/account" className="flex flex-col items-center text-gray-600">
            <User className="w-6 h-6" />
            <span className="text-xs">Akun</span>
          </a>
          <a href="/help" className="flex flex-col items-center text-gray-600">
            <HelpCircle className="w-6 h-6" />
            <span className="text-xs">Bantuan</span>
          </a>
        </div>
      </div>
    </div>
  );
}
