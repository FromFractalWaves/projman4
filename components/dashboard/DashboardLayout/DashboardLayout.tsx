import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from '@/components/ProjectCards/ProjectCards';
import { ObjectiveCard } from '@/components/ObjectiveCards/Objectivecards';
import { TaskCard } from '@/components/TaskCards/TaskCards';
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useObjectiveStore } from '@/store/objectiveStore';
import { Loader2, CheckCircle2, ListTodo, Target } from 'lucide-react';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';
import { Task } from '@/types/tasks';
import { ActionConfig } from '@/types/BaseCardTypes';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { tasks, updateTask, fetchTasks, isLoading: tasksLoading, error: tasksError } = useTaskStore();
  const { projects, updateProject, fetchProjects, isLoading: projectsLoading, error: projectsError } = useProjectStore();
  const { objectives, updateObjective, fetchObjectives, isLoading: objectivesLoading, error: objectivesError } = useObjectiveStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchTasks(), fetchProjects(), fetchObjectives()]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [fetchTasks, fetchProjects, fetchObjectives]);

  const isLoading = tasksLoading || projectsLoading || objectivesLoading;
  const hasError = tasksError || projectsError || objectivesError;

  // Stats data
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

  // Action configurations
  const projectActions: ActionConfig<Project>[] = [
    {
      label: 'Modify',
      action: async (project: Project) => {
        try {
          await updateProject(project.id, project);
          fetchProjects();
        } catch (error) {
          console.error('Error modifying project:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark In Progress',
      action: async (project: Project) => {
        try {
          await updateProject(project.id, { status: 'in_progress' });
          fetchProjects();
        } catch (error) {
          console.error('Error marking project in progress:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark Complete',
      action: async (project: Project) => {
        try {
          await updateProject(project.id, { status: 'completed' });
          fetchProjects();
        } catch (error) {
          console.error('Error marking project complete:', error);
        }
      },
      variant: 'default',
    }
  ];

  const objectiveActions: ActionConfig<Objective>[] = [
    {
      label: 'Modify',
      action: async (objective: Objective) => {
        try {
          await updateObjective(objective.id, objective);
          fetchObjectives();
        } catch (error) {
          console.error('Error modifying objective:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark In Progress',
      action: async (objective: Objective) => {
        try {
          await updateObjective(objective.id, { status: 'in_progress' });
          fetchObjectives();
        } catch (error) {
          console.error('Error marking objective in progress:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Update Progress',
      action: async (objective: Objective) => {
        try {
          const newProgress = Math.min(100, (objective.progress || 0) + 10);
          await updateObjective(objective.id, { progress: newProgress });
          fetchObjectives();
        } catch (error) {
          console.error('Error updating objective progress:', error);
        }
      },
      variant: 'default',
    }
  ];

  const taskActions: ActionConfig<Task>[] = [
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-64">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-center">
              Error loading dashboard data. Please try refreshing the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid gap-6">
        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
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
          ))}
        </div>

        {/* Main Content Sections */}
        <div className="grid gap-6">
          {/* Projects Section */}
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    actions={projectActions}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Objectives Section */}
          <Card>
            <CardHeader>
              <CardTitle>Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {objectives.map((objective) => (
                  <ObjectiveCard 
                    key={objective.id}
                    objective={objective}
                    actions={objectiveActions}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks Section */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                  <TaskCard 
                    key={task.id}
                    task={task}
                    actions={taskActions}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;