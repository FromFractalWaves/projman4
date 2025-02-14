import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useObjectiveStore } from '@/store/objectiveStore';
import { Clock, Target, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// Helper function to calculate due soon items
const calculateDueSoonItems = (items) => {
  return items.filter(item => {
    if (!item.dueDate) return false;
    const dueDate = new Date(item.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  }).length;
};

export function DashboardStats() {
  const { tasks, isLoading: tasksLoading, error: tasksError } = useTaskStore();
  const { projects, isLoading: projectsLoading, error: projectsError } = useProjectStore();
  const { objectives, isLoading: objectivesLoading, error: objectivesError } = useObjectiveStore();

  const [stats, setStats] = useState([]);
  const isLoading = tasksLoading || projectsLoading || objectivesLoading;
  const hasError = tasksError || projectsError || objectivesError;

  useEffect(() => {
    if (!isLoading && !hasError) {
      const newStats = [
        {
          title: "Total Tasks",
          value: tasks.length,
          icon: <Clock className="h-4 w-4 text-blue-600" />,
          change: tasks.filter(t => t.status === 'completed').length,
          changeLabel: "completed",
          color: "bg-blue-50"
        },
        {
          title: "Active Projects",
          value: projects.filter(p => p.status !== 'completed').length,
          icon: <Target className="h-4 w-4 text-green-600" />,
          change: projects.filter(p => p.priority === 'high' || p.priority === 'critical').length,
          changeLabel: "high priority",
          color: "bg-green-50"
        },
        {
          title: "Objectives Progress",
          value: objectives.length > 0
            ? Math.round(objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length)
            : 0,
          icon: <CheckCircle2 className="h-4 w-4 text-purple-600" />,
          change: objectives.filter(o => o.status === 'completed').length,
          changeLabel: "achieved",
          color: "bg-purple-50"
        },
        {
          title: "Due Soon",
          value: calculateDueSoonItems([...projects, ...objectives]),
          icon: <AlertCircle className="h-4 w-4 text-orange-600" />,
          change: 7,
          changeLabel: "days threshold",
          color: "bg-orange-50"
        }
      ];
      setStats(newStats);
    }
  }, [tasks, projects, objectives, isLoading, hasError]);

  if (hasError) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        Array(4).fill(0).map((_, index) => (
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
                {typeof stat.value === 'number' && stat.title === "Objectives Progress" 
                  ? `${stat.value}%` 
                  : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.change} {stat.changeLabel}
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}