import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      )
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password, // In real app, hash the password
        name,
        role: "MEMBER"
      }
    })

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mendaftar" },
      { status: 500 }
    )
  }
} 