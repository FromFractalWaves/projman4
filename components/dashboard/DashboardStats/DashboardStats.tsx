// components/Dashboard/DashboardStats/DashboardStats.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTaskStore } from '@/store/taskStore'
import { useProjectStore } from '@/store/projectStore'
import { useObjectiveStore } from '@/store/objectiveStore'
import { Clock, Target, CheckCircle2, AlertCircle } from 'lucide-react'

export function DashboardStats() {
  const { tasks } = useTaskStore()
  const { projects } = useProjectStore()
  const { objectives } = useObjectiveStore()

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: <Clock className="h-4 w-4 text-blue-600" />,
      change: tasks.filter(t => t.status === 'completed').length,
      changeLabel: "completed"
    },
    {
      title: "Active Projects",
      value: projects.filter(p => p.status !== 'completed').length,
      icon: <Target className="h-4 w-4 text-green-600" />,
      change: projects.filter(p => p.priority === 'high' || p.priority === 'critical').length,
      changeLabel: "high priority"
    },
    {
      title: "Objectives Progress",
      value: objectives.length > 0 
        ? Math.round(objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length)
        : 0,
      icon: <CheckCircle2 className="h-4 w-4 text-purple-600" />,
      change: objectives.filter(o => o.status === 'completed').length,
      changeLabel: "achieved"
    },
    {
      title: "Due Soon",
      value: [...projects, ...objectives].filter(item => {
        if (!item.dueDate) return false
        const dueDate = new Date(item.dueDate)
        const today = new Date()
        const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        return diffDays <= 7 && diffDays > 0
      }).length,
      icon: <AlertCircle className="h-4 w-4 text-orange-600" />,
      change: 7,
      changeLabel: "days threshold"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change} {stat.changeLabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}