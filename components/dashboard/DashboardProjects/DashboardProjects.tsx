// components/Dashboard/DashboardProjects/DashboardProjects.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectCard } from '@/components/ProjectCards/ProjectCards'
import { useProjectStore } from '@/store/projectStore'
import { Project } from '@/types/projects'

export function DashboardProjects() {
  const { projects, updateProject, deleteProject } = useProjectStore()

  const cardActions = [
    {
      label: 'Mark In Progress',
      action: (project: Project) => updateProject(project.id, { status: 'in_progress' }),
      variant: 'default' as const,
    },
    {
      label: 'Mark Complete',
      action: (project: Project) => updateProject(project.id, { status: 'completed' }),
      variant: 'default' as const,
    },
  ]

  const priorityProjects = projects
    .filter(p => p.priority === 'high' || p.priority === 'critical')
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>High Priority Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {priorityProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              actions={cardActions}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
