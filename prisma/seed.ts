// @ts-ignore
require('ts-node/register');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Bersihkan database terlebih dahulu
  await prisma.borrow.deleteMany()
  await prisma.book.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Fiksi",
        icon: "📚",
      },
    }),
    prisma.category.create({
      data: {
        name: "Non-Fiksi",
        icon: "📖",
      },
    }),
    prisma.category.create({
      data: {
        name: "Sains",
        icon: "🔬",
      },
    }),
    prisma.category.create({
      data: {
        name: "Teknologi",
        icon: "💻",
      },
    }),
  ])

  // Create Books
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&h=400&auto=format&fit=crop",
        description: "Kisah tentang American Dream di era 1920-an",
        isbn: "978-0743273565",
        categoryId: categories[0].id, // Fiksi
        rating: 4.7,
        totalRating: 150,
        stock: 5,
      },
    }),
    prisma.book.create({
      data: {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&h=400&auto=format&fit=crop",
        description: "Cara membangun kebiasaan baik dan menghilangkan kebiasaan buruk",
        isbn: "978-0735211292",
        categoryId: categories[1].id, // Non-Fiksi
        rating: 4.8,
        totalRating: 200,
        stock: 3,
      },
    }),
    prisma.book.create({
      data: {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&h=400&auto=format&fit=crop",
        description: "Penjelasan tentang alam semesta untuk pembaca umum",
        isbn: "978-0553380163",
        categoryId: categories[2].id, // Sains
        rating: 4.6,
        totalRating: 120,
        stock: 2,
      },
    }),
  ])

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "admin@library.com",
        name: "Admin",
        password: "admin123", // In real app, should be hashed
        role: "ADMIN",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&auto=format&fit=crop",
      },
    }),
    prisma.user.create({
      data: {
        email: "john@example.com",
        name: "John Doe",
        password: "password123", // In real app, should be hashed
        role: "MEMBER",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop",
      },
    }),
  ])

  // Create Borrows
  await prisma.borrow.create({
    data: {
      userId: users[1].id,
      bookId: books[0].id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      status: "BORROWED",
    },
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 