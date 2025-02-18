import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: params.id
      },
      include: {
        category: true
      }
    })

    if (!book) {
      return NextResponse.json(
        { error: "Buku tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json(book)
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data buku" },
      { status: 500 }
    )
  }
} 