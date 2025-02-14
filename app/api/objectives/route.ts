// app/api/objectives/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  console.log('GET /api/objectives - Starting request')
  try {
    const objectives = await prisma.objective.findMany({
      orderBy: { createdAt: 'desc' }
    })
    console.log('Successfully fetched objectives:', objectives.length)
    return NextResponse.json(objectives)
  } catch (error) {
    console.error('Error fetching objectives:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: 'Failed to fetch objectives', details: errorMessage },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  console.log('POST /api/objectives - Starting request')
  try {
    const json = await request.json()
    console.log('Received data:', json)
    
    const objective = await prisma.objective.create({
      data: {
        title: json.title,
        description: json.description,
        status: json.status || 'todo',
        priority: json.priority || 'medium',
        progress: json.progress || 0,
        dueDate: json.dueDate ? new Date(json.dueDate) : null
      }
    })
    console.log('Created objective:', objective)
    
    return NextResponse.json(objective)
  } catch (error) {
    console.error('Error creating objective:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: 'Failed to create objective', details: errorMessage },
      { status: 500 }
    )
  }
}