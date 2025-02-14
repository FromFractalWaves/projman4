import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ObjectiveCard } from '@/components/ObjectiveCards/Objectivecards';
import { useObjectiveStore } from '@/store/objectiveStore';
import { Objective } from '@/types/objectives';
import { Loader2 } from 'lucide-react';
import { ActionConfig } from '@/types/BaseCardTypes';

export function DashboardObjectives() {
  const { 
    objectives, 
    updateObjective, 
    isLoading,
    error,
    fetchObjectives 
  } = useObjectiveStore();

  // Use the same action pattern as BaseCard/BaseTable
  const cardActions: ActionConfig<Objective>[] = [
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

  // Get in-progress objectives with highest progress
  const inProgressObjectives = objectives
    .filter(o => o.status === 'in_progress')
    .sort((a, b) => {
      // Sort by progress first
      const progressDiff = b.progress - a.progress;
      if (progressDiff !== 0) return progressDiff;
      
      // Then by priority
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 3);

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600 text-center">
            Error loading objectives. Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Objectives in Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : inProgressObjectives.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressObjectives.map((objective) => (
              <ObjectiveCard 
                key={objective.id}
                objective={objective}
                actions={cardActions}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No objectives in progress at the moment.
          </p>
        )}
      </CardContent>
    </Card>
  );
}