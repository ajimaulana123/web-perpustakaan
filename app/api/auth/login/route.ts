import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || user.password !== password) { // In real app, use proper password hashing
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      )
    }

    // Set session cookie dengan path dan domain yang benar
    const cookieStore = cookies()
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Ubah ke lax untuk memungkinkan redirect
      path: '/', // Pastikan cookie tersedia di semua path
      maxAge: 7 * 24 * 60 * 60 // 1 week
    })

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  } catch (_error) {
    return NextResponse.json(
      { error: "Gagal login" },
      { status: 500 }
    )
  }
} 