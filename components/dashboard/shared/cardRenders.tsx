// components/dashboard/shared/cardRenderers.tsx
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { ProgressBar } from './ProgressBar';

export const renderTask = (task: Task) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <StatusBadge status={task.status} />
    </div>
    <p className="text-gray-600">{task.description}</p>
    <div className="text-sm text-gray-500">
      Last updated: {new Date(task.updatedAt).toLocaleDateString()}
    </div>
  </div>
);

export const renderProject = (project: Project) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <div className="flex items-center gap-2">
        <StatusBadge status={project.status} />
        <PriorityBadge priority={project.priority} />
      </div>
    </div>
    <p className="text-gray-600">{project.description}</p>
    <ProgressBar progress={project.progress} />
    {project.dueDate && (
      <div className="text-sm text-gray-500">
        Due: {new Date(project.dueDate).toLocaleDateString()}
      </div>
    )}
  </div>
);

export const renderObjective = (objective: Objective) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">{objective.title}</h3>
      <div className="flex items-center gap-2">
        <StatusBadge status={objective.status} />
        <PriorityBadge priority={objective.priority} />
      </div>
    </div>
    <p className="text-gray-600">{objective.description}</p>
    <ProgressBar progress={objective.progress} />
    {objective.dueDate && (
      <div className="text-sm text-gray-500">
        Due: {new Date(objective.dueDate).toLocaleDateString()}
      </div>
    )}
  </div>
);