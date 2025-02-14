'use client'

import React from 'react';
import { BaseCard } from '@/components/BaseCardSystem/BaseCard';
import { Objective } from '@/types/objectives';
import { ActionConfig } from '@/types/BaseCardTypes';

interface ObjectiveCardProps {
  objective: Objective;
  actions?: ActionConfig<Objective>[];
}

export function ObjectiveCard({ objective, actions }: ObjectiveCardProps) {
  const renderObjectiveContent = (objective: Objective) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{objective.title}</h3>
        <div className="flex items-center gap-2">
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
      
      {/* Progress bar */}
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

      {/* Date information */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
        {objective.dueDate && (
          <div>
            <span className="font-medium">Due: </span>
            {new Date(objective.dueDate).toLocaleDateString()}
          </div>
        )}
        <div>
          <span className="font-medium">Updated: </span>
          {new Date(objective.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  return (
    <BaseCard<Objective>
      item={objective}
      renderContent={renderObjectiveContent}
      title="Objective"
      actions={actions}
    />
  );
}