// components/dashboard/SimpleDashboard.tsx
'use client';

import React from 'react';
import { CardControlGroup } from '@/components/base/CardControlGroup/CardControlGroup';
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';
import { ActionConfig } from '@/types/BaseCardTypes';

// Example renderers for each card type.
const renderTask = (task: Task) => (
  <div className="space-y-2">
    <h3 className="text-lg font-bold">{task.title}</h3>
    <p className="text-sm text-muted-foreground">{task.description}</p>
    <span className="text-xs">{task.status}</span>
  </div>
);

const renderProject = (project: Project) => (
  <div className="space-y-2">
    <h3 className="text-lg font-bold">{project.title}</h3>
    <p className="text-sm text-muted-foreground">{project.description}</p>
    <span className="text-xs">{project.status}</span>
  </div>
);

const renderObjective = (objective: Objective) => (
  <div className="space-y-2">
    <h3 className="text-lg font-bold">{objective.title}</h3>
    <p className="text-sm text-muted-foreground">{objective.description}</p>
    <span className="text-xs">{objective.status}</span>
  </div>
);

interface SimpleDashboardProps {
  tasks: Task[];
  projects: Project[];
  objectives: Objective[];
  onAddTask: (newTask: Task) => void;
  onAddProject: (newProject: Project) => void;
  onAddObjective: (newObjective: Objective) => void;
  // Optionally, you can pass update and delete functions too if needed.
  updateTask: (updated: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateProject: (updated: Project) => Promise<void>;
  updateObjective: (updated: Objective) => Promise<void>;
}

export function SimpleDashboard({
  tasks,
  projects,
  objectives,
  onAddTask,
  onAddProject,
  onAddObjective,
  updateTask,
  deleteTask,
  updateProject,
  updateObjective,
}: SimpleDashboardProps): JSX.Element {
  // Define actions arrays for each entity.
  const taskActions: ActionConfig<Task>[] = [
    {
      label: 'Modify',
      action: async (modifiedTask: Task) => {
        await updateTask(modifiedTask);
      },
      variant: 'default',
    },
    {
      label: 'Delete',
      action: async (task: Task) => {
        await deleteTask(task.id);
      },
      variant: 'destructive',
    },
  ];

  const projectActions: ActionConfig<Project>[] = [
    {
      label: 'Modify',
      action: async (modifiedProject: Project) => {
        await updateProject(modifiedProject);
      },
      variant: 'default',
    },
    // Add more project-specific actions here if needed.
  ];

  const objectiveActions: ActionConfig<Objective>[] = [
    {
      label: 'Modify',
      action: async (modifiedObjective: Objective) => {
        await updateObjective(modifiedObjective);
      },
      variant: 'default',
    },
    // Additional actions (e.g., Mark Complete) can be added here.
  ];

  return (
    <div className="space-y-8 p-4">
      <CardControlGroup<Task>
        data={tasks}
        title="Tasks"
        addNewItem={onAddTask}
        defaultNewItem={{ title: '', description: '', status: 'todo' }}
        renderContent={renderTask}
        actions={taskActions}
        gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      />
      <CardControlGroup<Project>
        data={projects}
        title="Projects"
        addNewItem={onAddProject}
        defaultNewItem={{
          title: '',
          description: '',
          status: 'todo',
          priority: 'medium',
          progress: 0,
          dueDate: null,
        }}
        renderContent={renderProject}
        actions={projectActions}
        gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      />
      <CardControlGroup<Objective>
        data={objectives}
        title="Objectives"
        addNewItem={onAddObjective}
        defaultNewItem={{
          title: '',
          description: '',
          status: 'todo',
          priority: 'medium',
          progress: 0,
          dueDate: null,
          startOn: null,
          started: null,
        }}
        renderContent={renderObjective}
        actions={objectiveActions}
        gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      />
    </div>
  );
}
