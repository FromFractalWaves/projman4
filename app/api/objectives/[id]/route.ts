// app/api/objectives/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const json = await request.json()
      const objective = await prisma.objective.update({
        where: { id: params.id },
        data: json,
      })
      return NextResponse.json(objective)
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to update objective' },
        { status: 500 }
      )
    }
  }
  
  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await prisma.objective.delete({
        where: { id: params.id },
      })
      return new NextResponse(null, { status: 204 })
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to delete objective' },
        { status: 500 }
      )
    }
  }