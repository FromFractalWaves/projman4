'use client'

import { DashboardLayout } from '@/components/dashboard/DashboardLayout/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats/DashboardStats';
import { DashboardProjects } from '@/components/dashboard/DashboardProjects/DashboardProjects';
import { DashboardObjectives } from '@/components/dashboard/DashboardObjectives/DashboardObjectives';
import { DashboardTasks } from '@/components/dashboard/DashboardTasks/DashboardTasks';

export default function DashboardPage() {
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
  );
}