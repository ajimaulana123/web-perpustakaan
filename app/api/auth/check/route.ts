import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const userId = cookies().get('userId')?.value

    if (!userId) {
      return NextResponse.json({ isLoggedIn: false })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true }
    })

    if (!user) {
      return NextResponse.json({ isLoggedIn: false })
    }

    return NextResponse.json({
      isLoggedIn: true,
      user
    })
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false })
  }
} 