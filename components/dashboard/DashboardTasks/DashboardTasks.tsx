import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskCard } from '@/components/TaskCards/TaskCards';
import { useTaskStore } from '@/store/taskStore';
import { Task } from '@/types/tasks';
import { Loader2 } from 'lucide-react';
import { ActionConfig } from '@/types/BaseCardTypes';

export function DashboardTasks() {
  const { 
    tasks, 
    updateTask,
    deleteTask, 
    isLoading,
    error,
    fetchTasks 
  } = useTaskStore();

  // Use the same action pattern as BaseCard/BaseTable
  const cardActions: ActionConfig<Task>[] = [
    {
      label: 'Modify',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, task);
          fetchTasks();
        } catch (error) {
          console.error('Error modifying task:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark In Progress',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, { status: 'in_progress' });
          fetchTasks();
        } catch (error) {
          console.error('Error marking task in progress:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark Complete',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, { status: 'completed' });
          fetchTasks();
        } catch (error) {
          console.error('Error marking task complete:', error);
        }
      },
      variant: 'default',
    }
  ];

  // Get recent non-completed tasks
  const recentTasks = tasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600 text-center">
            Error loading tasks. Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : recentTasks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {recentTasks.map((task) => (
              <TaskCard 
                key={task.id}
                task={task}
                actions={cardActions}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No active tasks at the moment.
          </p>
        )}
      </CardContent>
    </Card>
  );
}