// app/timeline/page.tsx
'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DataTable } from '@/components/DataTableControlGroup/DataTable'
import { useTaskStore } from '@/store/taskStore'
import { Task } from '@/types/task'

interface TimelineGroup {
  date: string
  tasks: Task[]
}

function groupTasksByDate(tasks: Task[]): TimelineGroup[] {
  const grouped = tasks.reduce((acc: { [key: string]: Task[] }, task) => {
    const date = new Date(task.createdAt).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(task)
    return acc
  }, {})

  return Object.entries(grouped)
    .map(([date, tasks]) => ({ date, tasks }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function TimelinePage() {
  const { tasks, updateTask, deleteTask } = useTaskStore()
  const timelineGroups = groupTasksByDate(tasks)

  const columns = [
    { 
      accessorKey: 'title' as keyof Task, 
      header: 'Title'
    },
    { 
      accessorKey: 'status' as keyof Task, 
      header: 'Status',
      cell: ({ row }: { row: { original: Task } }) => (
        <span className={
          row.original.status === 'completed' ? 'text-green-600' :
          row.original.status === 'in-progress' ? 'text-blue-600' :
          'text-gray-600'
        }>
          {row.original.status}
        </span>
      )
    },
    { 
      accessorKey: 'updatedAt' as keyof Task, 
      header: 'Last Updated'
    }
  ]

  const actions = [
    {
      label: 'Mark Complete',
      action: (task: Task) => updateTask(task.id, { status: 'completed' }),
      variant: 'default' as const
    },
    {
      label: 'Delete',
      action: (task: Task) => deleteTask(task.id),
      variant: 'destructive' as const
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Timeline View</h1>
      <div className="space-y-6">
        {timelineGroups.map((group) => (
          <Card key={group.date} className="w-full">
            <CardHeader>
              <CardTitle>{group.date}</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable<Task>
                data={group.tasks}
                columns={columns}
                actions={actions}
                title=""
              />
            </CardContent>
          </Card>
        ))}
        {timelineGroups.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No tasks found. Create some tasks to see them in the timeline.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}