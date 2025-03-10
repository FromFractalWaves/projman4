import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const project = await prisma.project.create({
      data: {
        title: json.title,
        description: json.description,
        status: json.status || 'todo',
        priority: json.priority || 'medium',
        progress: json.progress || 0,
        dueDate: json.dueDate ? new Date(json.dueDate) : null
      }
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
