// pages/dashboard.tsx
// 'use client';

// import React from 'react';
// import { BaseDashboard } from '@/components/base/BaseDashboard/BaseDashboard';
// import { DashboardHeader } from '@/components/dashboard/DashboardLayout/DashboardHeader';
// import { DashboardStats } from '@/components/dashboard/DashboardStats/DashboardStats';
// // Import your widgets for Projects, Objectives, and Tasks here.
// // For simplicity, assume you have DashboardProjects, DashboardObjectives, DashboardTasks components.
// import { DashboardProjects } from '@/components/dashboard/DashboardProjects/DashboardProjects';
// import { DashboardObjectives } from '@/components/dashboard/DashboardObjectives/DashboardObjectives';
// import { DashboardTasks } from '@/components/dashboard/DashboardTasks/DashboardTasks';
// pages/dashboard.tsx
'use client';

import React from 'react';
import { BaseDashboard } from '@/components/base/BaseDashboard/BaseDashboard';
import { DashboardHeader } from '@/components/dashboard/DashboardLayout/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats/DashboardStats';

// Import your widgets for Tasks, Projects, and Objectives
import { DashboardTasks } from '@/components/dashboard/DashboardTasks/DashboardTasks';
import { DashboardProjects } from '@/components/dashboard/DashboardProjects/DashboardProjects';
import { DashboardObjectives } from '@/components/dashboard/DashboardObjectives/DashboardObjectives';

// Example icons - make sure these are correctly imported from your icon library
import { ListTodo, Target, CheckCircle2 } from 'lucide-react';

// Dummy functions and data to simulate store interactions
async function addTask(task: any) {
  /* API call to add a task */
}

async function addProject(project: any) {
  /* API call to add a project */
}

async function addObjective(objective: any) {
  /* API call to add an objective */
}

export default function DashboardPage() {
  // For this example, assume you load your data from stores or props.
  const statsData = [
    {
      title: 'Tasks',
      total: 42,
      active: 30,
      icon: <ListTodo className="h-4 w-4 text-blue-600" />,
      color: 'bg-blue-50',
    },
    {
      title: 'Projects',
      total: 10,
      active: 7,
      icon: <Target className="h-4 w-4 text-green-600" />,
      color: 'bg-green-50',
    },
    {
      title: 'Objectives',
      total: 5,
      active: 3,
      icon: <CheckCircle2 className="h-4 w-4 text-purple-600" />,
      color: 'bg-purple-50',
    },
  ];
  const isLoading = false;

  // Here you would fetch and pass your tasks, projects, objectives to the respective widgets

  const header = (
    <DashboardHeader 
      onAddTask={addTask}
      onAddProject={addProject}
      onAddObjective={addObjective}
    />
  );

  const sections = [
    { title: 'Stats', content: <DashboardStats stats={statsData} isLoading={isLoading} /> },
    { title: 'Tasks', content: <DashboardTasks /> },
    { title: 'Projects', content: <DashboardProjects /> },
    { title: 'Objectives', content: <DashboardObjectives /> },
  ];

  return <BaseDashboard header={header} sections={sections} />;
}
