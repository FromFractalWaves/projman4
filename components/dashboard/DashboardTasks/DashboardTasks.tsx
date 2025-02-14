// components/Dashboard/DashboardTasks/DashboardTasks.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TaskCard } from '@/components/TaskCards/TaskCards'
import { useTaskStore } from '@/store/taskStore'
import { Task } from '@/types/tasks'

export function DashboardTasks() {
  const { tasks, updateTask } = useTaskStore()

  const cardActions = [
    {
      label: 'Mark Complete',
      action: (task: Task) => updateTask(task.id, { status: 'completed' }),
      variant: 'default' as const,
    },
  ]

  const recentTasks = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentTasks.map((task) => (
            <TaskCard 
              key={task.id}
              task={task}
              actions={cardActions}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}