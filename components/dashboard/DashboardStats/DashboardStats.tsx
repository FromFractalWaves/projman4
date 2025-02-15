import React from 'react';
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useObjectiveStore } from '@/store/objectiveStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ListTodo, Target, Loader2 } from 'lucide-react';

export function DashboardStats() {
  const { tasks, isLoading: tasksLoading, error: tasksError } = useTaskStore();
  const { projects, isLoading: projectsLoading, error: projectsError } = useProjectStore();
  const { objectives, isLoading: objectivesLoading, error: objectivesError } = useObjectiveStore();

  const isLoading = tasksLoading || projectsLoading || objectivesLoading;
  const hasError = tasksError || projectsError || objectivesError;

  const stats = [
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

  if (hasError) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-full bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-center">
              Error loading dashboard stats. Please try refreshing the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {isLoading ? (
        Array(3).fill(0).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </CardTitle>
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))
      ) : (
        stats.map((stat, index) => (
          <Card key={index} className={stat.color}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.total}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.active} active
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default DashboardStats;