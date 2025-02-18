import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      take: 3,
      orderBy: {
        rating: 'desc'
      },
      select: {
        id: true,
        title: true,
        author: true,
        cover: true,
        status: true,
        category: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json(books)
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data buku" },
      { status: 500 }
    )
  }
} 