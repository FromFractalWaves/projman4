'use client';

import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ListTodo, Target, CheckCircle2 } from 'lucide-react';

// Import base components
import { BaseDashboard } from '@/components/base/BaseDashboard/BaseDashboard';
import { CardControlGroup } from '@/components/base/CardControlGroup/CardControlGroup';

// Import stores
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useObjectiveStore } from '@/store/objectiveStore';

// Import types
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';
import { DashboardHeader } from '@/components/dashboard/DashboardLayout/DashboardHeader';

// Render functions for each card type
const renderTask = (task: Task) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <span className={`px-2 py-1 rounded-full text-sm ${
        task.status === 'completed' 
          ? 'bg-green-100 text-green-800' 
          : task.status === 'in_progress'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </span>
    </div>
    <p className="text-gray-600">{task.description}</p>
    <div className="text-sm text-gray-500">
      Last updated: {new Date(task.updatedAt).toLocaleDateString()}
    </div>
  </div>
);

const renderProject = (project: Project) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <div className="flex gap-2">
        <span className={`px-2 py-1 rounded-full text-sm ${
          project.status === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : project.status === 'in_progress'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {project.status === 'in_progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
        <span className={`px-2 py-1 rounded-full text-sm ${
          project.priority === 'critical'
            ? 'bg-red-100 text-red-800'
            : project.priority === 'high'
            ? 'bg-orange-100 text-orange-800'
            : project.priority === 'medium'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
        </span>
      </div>
    </div>
    <p className="text-gray-600">{project.description}</p>
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{project.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </div>
    {project.dueDate && (
      <div className="text-sm text-gray-500">
        Due: {new Date(project.dueDate).toLocaleDateString()}
      </div>
    )}
  </div>
);

const renderObjective = (objective: Objective) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{objective.title}</h3>
      <div className="flex gap-2">
        <span className={`px-2 py-1 rounded-full text-sm ${
          objective.status === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : objective.status === 'in_progress'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {objective.status === 'in_progress' ? 'In Progress' : objective.status.charAt(0).toUpperCase() + objective.status.slice(1)}
        </span>
        <span className={`px-2 py-1 rounded-full text-sm ${
          objective.priority === 'critical'
            ? 'bg-red-100 text-red-800'
            : objective.priority === 'high'
            ? 'bg-orange-100 text-orange-800'
            : objective.priority === 'medium'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {objective.priority.charAt(0).toUpperCase() + objective.priority.slice(1)}
        </span>
      </div>
    </div>
    <p className="text-gray-600">{objective.description}</p>
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progress</span>
        <span>{objective.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${objective.progress}%` }}
        />
      </div>
    </div>
    {objective.dueDate && (
      <div className="text-sm text-gray-500">
        Due: {new Date(objective.dueDate).toLocaleDateString()}
      </div>
    )}
  </div>
);

export default function DashboardPage() {
  // Initialize stores
  const { 
    tasks, 
    fetchTasks, 
    addTask,
    updateTask,
    deleteTask,
    isLoading: tasksLoading,
    error: tasksError 
  } = useTaskStore();

  const { 
    projects, 
    fetchProjects, 
    addProject,
    updateProject,
    deleteProject,
    isLoading: projectsLoading,
    error: projectsError 
  } = useProjectStore();

  const { 
    objectives, 
    fetchObjectives, 
    addObjective,
    updateObjective,
    deleteObjective,
    isLoading: objectivesLoading,
    error: objectivesError 
  } = useObjectiveStore();

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchTasks(),
          fetchProjects(),
          fetchObjectives()
        ]);
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

  // Show loading state
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

  // Show error state
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

  const header = (
    <DashboardHeader 
      onAddTask={addTask}
      onAddProject={addProject}
      onAddObjective={addObjective}
    />
  );

  const sections = [
    {
      title: 'Tasks',
      content: (
        <CardControlGroup<Task>
          data={tasks}
          renderContent={renderTask}
          title="Tasks"
          addNewItem={addTask}
          defaultNewItem={{ 
            title: '', 
            description: '', 
            status: 'todo' 
          }}
          actions={[
            {
              label: 'Mark In Progress',
              action: async (task) => {
                await updateTask(task.id, { ...task, status: 'in_progress' });
                fetchTasks();
              }
            },
            {
              label: 'Mark Complete',
              action: async (task) => {
                await updateTask(task.id, { ...task, status: 'completed' });
                fetchTasks();
              }
            },
            {
              label: 'Delete',
              action: async (task) => {
                await deleteTask(task.id);
                fetchTasks();
              },
              variant: 'destructive'
            }
          ]}
        />
      )
    },
    {
      title: 'Projects',
      content: (
        <CardControlGroup<Project>
          data={projects}
          renderContent={renderProject}
          title="Projects"
          addNewItem={addProject}
          defaultNewItem={{
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            progress: 0,
            dueDate: null
          }}
          actions={[
            {
              label: 'Mark In Progress',
              action: async (project) => {
                await updateProject(project.id, { ...project, status: 'in_progress' });
                fetchProjects();
              }
            },
            {
              label: 'Update Progress',
              action: async (project) => {
                const newProgress = Math.min(100, (project.progress || 0) + 10);
                await updateProject(project.id, { ...project, progress: newProgress });
                fetchProjects();
              }
            },
            {
              label: 'Delete',
              action: async (project) => {
                await deleteProject(project.id);
                fetchProjects();
              },
              variant: 'destructive'
            }
          ]}
          dateFields={{
            startOn: { label: 'Start On', value: null, enabled: false },
            started: { label: 'Started', value: null, enabled: false },
            dueDate: { label: 'Due Date', value: null, enabled: false }
          }}
        />
      )
    },
    {
      title: 'Objectives',
      content: (
        <CardControlGroup<Objective>
          data={objectives}
          renderContent={renderObjective}
          title="Objectives"
          addNewItem={addObjective}
          defaultNewItem={{
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            progress: 0,
            dueDate: null
          }}
          actions={[
            {
              label: 'Mark In Progress',
              action: async (objective) => {
                await updateObjective(objective.id, { ...objective, status: 'in_progress' });
                fetchObjectives();
              }
            },
            {
              label: 'Update Progress',
              action: async (objective) => {
                const newProgress = Math.min(100, (objective.progress || 0) + 10);
                await updateObjective(objective.id, { ...objective, progress: newProgress });
                fetchObjectives();
              }
            },
            {
              label: 'Delete',
              action: async (objective) => {
                await deleteObjective(objective.id);
                fetchObjectives();
              },
              variant: 'destructive'
            }
          ]}
          dateFields={{
            startOn: { label: 'Start On', value: null, enabled: false },
            started: { label: 'Started', value: null, enabled: false },
            dueDate: { label: 'Due Date', value: null, enabled: false }
          }}
        />
      )
    }
  ];

  return <BaseDashboard header={header} sections={sections} />;
}