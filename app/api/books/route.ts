import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const category = searchParams.get('category')

  let where = {}
  if (search) {
    where = {
      OR: [
        { title: { contains: search } },
        { author: { contains: search } },
        { category: { name: { contains: search } } }
      ]
    }
  }
  if (category) {
    where = { ...where, category: { name: category } }
  }

  const books = await prisma.book.findMany({
    where,
    include: {
      category: true,
    }
  })

  return NextResponse.json(books)
} 