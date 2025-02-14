// components/ProjectCards/ProjectCards.tsx
'use client'

import React from 'react';
import { BaseCard } from '@/components/BaseCardSystem/BaseCard';
import { Project } from '@/types/projects';
import { ActionConfig } from '@/types/BaseCardTypes';

interface ProjectCardProps {
  project: Project;
  actions?: ActionConfig<Project>[];
}

export function ProjectCard({ project, actions }: ProjectCardProps) {
  // Move the render function inside to avoid recursive rendering
  const renderContent = (item: Project) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            item.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : item.status === 'in_progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {item.status === 'in_progress' ? 'In Progress' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            item.priority === 'critical'
              ? 'bg-red-100 text-red-800'
              : item.priority === 'high'
              ? 'bg-orange-100 text-orange-800'
              : item.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </span>
        </div>
      </div>
      <p className="text-gray-600">{item.description}</p>
      
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{item.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${item.progress}%` }}
          />
        </div>
      </div>

      {/* Date information */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
        {item.dueDate && (
          <div>
            <span className="font-medium">Due: </span>
            {new Date(item.dueDate).toLocaleDateString()}
          </div>
        )}
        <div>
          <span className="font-medium">Updated: </span>
          {new Date(item.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  return (
    <BaseCard<Project>
      item={project}
      renderContent={renderContent}
      title="Project"
      actions={actions}
    />
  );
}

