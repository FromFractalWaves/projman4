'use client'

import React from 'react';
import { BaseCardGrid } from '@/components/BaseCardSystem/BaseCardGrid';
import { Objective } from '@/types/objectives';
import { useObjectiveStore } from '@/store/objectiveStore';
import { useEffect } from 'react';
import { ObjectiveCard } from '@/components/ObjectiveCards/Objectivecards';

export default function ObjectiveCardPage() {
  const { 
    objectives, 
    fetchObjectives, 
    updateObjective, 
    deleteObjective 
  } = useObjectiveStore();

  useEffect(() => {
    fetchObjectives();
  }, [fetchObjectives]);

  // Card actions for objectives
  const cardActions = [
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
      variant: 'default' as const,
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
      variant: 'default' as const,
    },
    {
      label: 'Mark Complete',
      action: async (objective: Objective) => {
        try {
          await updateObjective(objective.id, { status: 'completed' });
          fetchObjectives();
        } catch (error) {
          console.error('Error marking objective complete:', error);
        }
      },
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      action: async (objective: Objective) => {
        try {
          await deleteObjective(objective.id);
          fetchObjectives();
        } catch (error) {
          console.error('Error deleting objective:', error);
        }
      },
      variant: 'destructive' as const,
    },
  ];

  // Render function for objective card content
  const renderObjectiveContent = (objective: Objective) => (
    <ObjectiveCard objective={objective} actions={cardActions} />
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Objective Card System</h1>
      
      <div className="space-y-8">
        {/* Single ObjectiveCard example */}
        {objectives.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Single Objective Card Example</h2>
            <ObjectiveCard
              objective={objectives[0]}
              actions={cardActions}
            />
          </div>
        )}

        {/* ObjectiveCard Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Objective Card Grid</h2>
          <BaseCardGrid
            items={objectives}
            renderContent={renderObjectiveContent}
            cardTitle="Objective"
            actions={cardActions}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          />
        </div>
      </div>
    </div>
  );
}