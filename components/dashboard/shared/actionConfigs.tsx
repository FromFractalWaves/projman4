// components/dashboard/shared/actionConfigs.ts
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';
import { ActionConfig } from '@/types/BaseCardTypes';
import { Status } from '@/types/base';

export function createTaskActions(
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>,
  deleteTask: (id: string) => Promise<void>,
  fetchTasks: () => Promise<void>
): ActionConfig<Task>[] {
  return [
    {
      label: 'Mark In Progress',
      action: async (task) => {
        await updateTask(task.id, { ...task, status: Status.InProgress });
        fetchTasks();
      }
    },
    {
      label: 'Mark Complete',
      action: async (task) => {
        await updateTask(task.id, { ...task, status: Status.Completed });
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
  ];
}

export function createProjectActions(
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>,
  deleteProject: (id: string) => Promise<void>,
  fetchProjects: () => Promise<void>
): ActionConfig<Project>[] {
  return [
    {
      label: 'Mark In Progress',
      action: async (project) => {
        await updateProject(project.id, { ...project, status: Status.InProgress });
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
  ];
}

export function createObjectiveActions(
  updateObjective: (id: string, updates: Partial<Objective>) => Promise<void>,
  deleteObjective: (id: string) => Promise<void>,
  fetchObjectives: () => Promise<void>
): ActionConfig<Objective>[] {
  return [
    {
      label: 'Mark In Progress',
      action: async (objective) => {
        await updateObjective(objective.id, { ...objective, status: Status.InProgress });
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
  ];
}