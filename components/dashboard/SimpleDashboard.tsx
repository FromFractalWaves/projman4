// components/dashboard/SimpleDashboard.tsx
'use client';

import React from 'react';
import { CardControlGroup } from '@/components/base/CardControlGroup/CardControlGroup';
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';

// Basic renderers for each card type. You can replace these with your existing TaskCard,
// ProjectCard, and ObjectiveCard if needed.
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
}

export function SimpleDashboard({
  tasks,
  projects,
  objectives,
  onAddTask,
  onAddProject,
  onAddObjective,
}: SimpleDashboardProps): JSX.Element {
  return (
    <div className="space-y-8 p-4">
      <CardControlGroup<Task>
        data={tasks}
        title="Tasks"
        addNewItem={onAddTask}
        defaultNewItem={{ title: '', description: '', status: 'todo' }}
        renderContent={renderTask}
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
        gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      />
    </div>
  );
}
