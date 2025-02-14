// app/dashboard/page.tsx
'use client'

import { useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats/DashboardStats';
import { DashboardProjects } from '@/components/dashboard/DashboardProjects/DashboardProjects';
import { DashboardObjectives } from '@/components/dashboard/DashboardObjectives/DashboardObjectives'
import { DashboardTasks } from '@/components/dashboard/DashboardTasks/DashboardTasks'
import { useTaskStore } from '@/store/taskStore'
import { useProjectStore } from '@/store/projectStore'
import { useObjectiveStore } from '@/store/objectiveStore'

export default function DashboardPage() {
  const { fetchTasks } = useTaskStore()
  const { fetchProjects } = useProjectStore()
  const { fetchObjectives } = useObjectiveStore()

  useEffect(() => {
    // Fetch all data when dashboard loads
    fetchTasks()
    fetchProjects()
    fetchObjectives()
  }, [fetchTasks, fetchProjects, fetchObjectives])

  return (
    <DashboardLayout>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3">
          <DashboardProjects />
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          <DashboardObjectives />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <DashboardTasks />
        </div>
      </div>
    </DashboardLayout>
  )
}