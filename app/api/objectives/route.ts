// app/api/objectives/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const objectives = await prisma.objective.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(objectives)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch objectives' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const objective = await prisma.objective.create({
      data: json
    })
    return NextResponse.json(objective)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create objective' },
      { status: 500 }
    )
  }
}

