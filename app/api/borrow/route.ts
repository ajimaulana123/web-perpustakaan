import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { bookId } = await request.json()
    
    // Ambil userId dari cookie
    const userId = cookies().get('userId')?.value
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Cek ketersediaan buku
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    })

    if (!book || book.status !== "AVAILABLE" || book.stock < 1) {
      return NextResponse.json(
        { error: "Buku tidak tersedia untuk dipinjam" },
        { status: 400 }
      )
    }

    // Buat peminjaman baru
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + 14) // 14 hari peminjaman

    const borrow = await prisma.borrow.create({
      data: {
        userId,
        bookId,
        dueDate,
        status: "BORROWED"
      }
    })

    // Update status dan stok buku
    await prisma.book.update({
      where: { id: bookId },
      data: {
        stock: book.stock - 1,
        status: book.stock === 1 ? "BORROWED" : "AVAILABLE"
      }
    })

    return NextResponse.json(borrow)
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal meminjam buku" },
      { status: 500 }
    )
  }
} 