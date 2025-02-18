"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Image
                src="https://cdn.jsdelivr.net/npm/@tabler/icons@2.47.0/icons/book.svg"
                alt="Library Logo"
                width={40}
                height={40}
                className="w-auto h-8 transition-transform group-hover:scale-110 invert"
              />
              <span className="ml-2 text-xl font-semibold text-white">
                MyLibrary
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            {[
              { href: "/", label: "Beranda" },
              { href: "/books", label: "Buku" },
              { href: "/account", label: "Akun Saya" },
              { href: "/help", label: "Bantuan" },
              { href: "/admin", label: "Admin Panel" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-orange-500 text-white font-medium"
                    : "text-white/90 hover:bg-blue-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 