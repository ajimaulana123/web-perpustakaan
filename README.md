# Library Management System

Sistem manajemen perpustakaan modern berbasis web yang dibangun dengan Next.js 14 dan Prisma.

## Fitur

- 📚 Katalog Buku
  - Pencarian buku
  - Filter berdasarkan kategori
  - Detail buku lengkap
  - Status ketersediaan

- 👥 Manajemen Pengguna
  - Registrasi member
  - Login/logout
  - Role-based access (Admin, Staff, Member)
  - Profil pengguna

- 📖 Peminjaman
  - Peminjaman buku
  - Pengembalian buku
  - Riwayat peminjaman
  - Status peminjaman

## Tech Stack

- **Frontend:** Next.js 14, TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Deployment:** Vercel

## Instalasi & Penggunaan

1. Clone repository
```bash
git clone https://github.com/yourusername/library-management.git
cd library-management
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```
Isi dengan kredensial database Anda

4. Setup database
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Jalankan aplikasi
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Project

```
library-management/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API Routes
│   ├── books/             # Halaman buku
│   ├── components/        # Komponen yang dapat digunakan kembali
│   └── ...
├── prisma/                # Prisma schema dan migrations
└── public/                # Asset statis
```

## API Endpoints

- `GET /api/books` - Mendapatkan daftar buku
- `GET /api/books/:id` - Mendapatkan detail buku
- `POST /api/borrow` - Meminjam buku
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Registrasi user baru

## Deployment

Project ini di-deploy menggunakan Vercel. Untuk melakukan deployment:

1. Push code ke GitHub
2. Import project di Vercel
3. Tambahkan environment variables
4. Deploy!

## Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau buka issue untuk diskusi fitur baru.

## Lisensi

[MIT License](LICENSE)

## Kontak

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## Credits

- UI Design terinspirasi dari modern library interfaces
- Gambar dari [Unsplash](https://unsplash.com)
