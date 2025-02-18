"use client";

import { User, Book, Clock, Bell, Settings } from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Account() {
  const borrowedBooks = [
    {
      title: "The Psychology of Money",
      dueDate: "2024-03-25",
      cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=300&h=400&auto=format&fit=crop",
    },
    // ... tambahkan buku lainnya
  ];

  const actions = [
    { icon: <Book className="w-6 h-6" />, label: "Buku Dipinjam", value: "3" },
    { icon: <Clock className="w-6 h-6" />, label: "Jatuh Tempo", value: "1" },
    { icon: <Bell className="w-6 h-6" />, label: "Notifikasi", value: "2" },
    { icon: <Settings className="w-6 h-6" />, label: "Pengaturan", value: "" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-orange-400">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&auto=format&fit=crop"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
              <p className="text-gray-600">Member sejak Januari 2024</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {actions.map((action) => (
            <button
              key={action.label}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-orange-50 transition-all group"
            >
              <div className="text-blue-600 group-hover:text-orange-500 transition-colors">
                {action.icon}
              </div>
              <span className="text-gray-800">{action.label}</span>
              {action.value && (
                <span className="bg-orange-100 text-orange-800 px-2 rounded-full text-sm">
                  {action.value}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Borrowed Books */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Buku yang Dipinjam</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {borrowedBooks.map((book) => (
              <div key={book.title} className="bg-white rounded-lg p-4 flex gap-4">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={60}
                  height={80}
                  className="rounded object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Jatuh tempo: {book.dueDate}</p>
                  <button className="text-blue-600 text-sm hover:underline">
                    Perpanjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 