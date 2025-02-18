const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
})

async function cleanDatabase() {
  // Hapus data dengan urutan yang benar (karena relasi foreign key)
  const modelsToClear = [
    'borrow',
    'book',
    'category',
    'user'
  ]

  return Promise.all(
    modelsToClear.map(async (model) => {
      try {
        // @ts-ignore
        await prisma[model].deleteMany({})
        console.log(`Cleared ${model} table`)
      } catch (error) {
        console.log(`Error clearing ${model} table:`, error)
      }
    })
  )
}

async function main() {
  console.log('Starting seed...')

  try {
    // Bersihkan database
    await cleanDatabase()

    // Create Categories
    console.log('Creating categories...')
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
    console.log('Categories created!')

    // Create Books
    console.log('Creating books...')
    const books = await Promise.all([
      prisma.book.create({
        data: {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&h=400&auto=format&fit=crop",
          description: "Kisah tentang American Dream di era 1920-an",
          isbn: "978-0743273565",
          categoryId: categories[0].id,
          rating: 4.7,
          totalRating: 150,
          stock: 5,
          status: "AVAILABLE"
        },
      }),
      prisma.book.create({
        data: {
          title: "Atomic Habits",
          author: "James Clear",
          cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&h=400&auto=format&fit=crop",
          description: "Cara membangun kebiasaan baik dan menghilangkan kebiasaan buruk",
          isbn: "978-0735211292",
          categoryId: categories[1].id,
          rating: 4.8,
          totalRating: 200,
          stock: 3,
          status: "AVAILABLE"
        },
      }),
    ])
    console.log('Books created!')

    // Create Users
    console.log('Creating users...')
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: "admin@library.com",
          name: "Admin",
          password: "admin123",
          role: "ADMIN",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&auto=format&fit=crop",
        },
      }),
      prisma.user.create({
        data: {
          email: "john@example.com",
          name: "John Doe",
          password: "password123",
          role: "MEMBER",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&h=100&auto=format&fit=crop",
        },
      }),
    ])
    console.log('Users created!')

    // Create Sample Borrow
    console.log('Creating sample borrow...')
    const borrow = await prisma.borrow.create({
      data: {
        userId: users[1].id,
        bookId: books[0].id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        status: "BORROWED",
      },
    })
    console.log('Sample borrow created!')

    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('Error in seed script:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })