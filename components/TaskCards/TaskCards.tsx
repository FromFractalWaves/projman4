'use client'

import React from 'react';
import { BaseCard } from '@/components/BaseCardSystem/BaseCard';
import { Task } from '@/types/tasks';
import { ActionConfig } from '@/types/BaseCardTypes';

interface TaskCardProps {
  task: Task;
  actions?: ActionConfig<Task>[];
}

export function TaskCard({ task, actions }: TaskCardProps) {
  const renderTaskContent = (task: Task) => (
    <div className="space-y-4">
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

  return (
    <BaseCard<Task>
      item={task}
      renderContent={renderTaskContent}
      title="Task"
      actions={actions}
    />
  );
}