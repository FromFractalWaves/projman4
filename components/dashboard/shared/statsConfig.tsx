// components/dashboard/shared/statsConfig.tsx
import { ListTodo, Target, CheckCircle2 } from 'lucide-react';
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';

export function createDashboardStats(
  tasks: Task[], 
  projects: Project[], 
  objectives: Objective[]
) {
  return [
    {
      title: "Tasks",
      total: tasks.length,
      active: tasks.filter(t => t.status !== 'completed').length,
      icon: <ListTodo className="h-4 w-4 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Projects",
      total: projects.length,
      active: projects.filter(p => p.status !== 'completed').length,
      icon: <Target className="h-4 w-4 text-green-600" />,
      color: "bg-green-50"
    },
    {
      title: "Objectives",
      total: objectives.length,
      active: objectives.filter(o => o.status !== 'completed').length,
      icon: <CheckCircle2 className="h-4 w-4 text-purple-600" />,
      color: "bg-purple-50"
    }
  ];
}