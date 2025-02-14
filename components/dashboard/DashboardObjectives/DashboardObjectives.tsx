// components/Dashboard/DashboardObjectives/DashboardObjectives.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ObjectiveCard } from '@/components/ObjectiveCards/Objectivecards'
import { useObjectiveStore } from '@/store/objectiveStore'
import { Objective } from '@/types/objectives'

export function DashboardObjectives() {
  const { objectives, updateObjective } = useObjectiveStore()

  const cardActions = [
    {
      label: 'Update Progress',
      action: (objective: Objective) => {
        const newProgress = Math.min(100, (objective.progress || 0) + 10)
        updateObjective(objective.id, { progress: newProgress })
      },
      variant: 'default' as const,
    },
  ]

  const inProgressObjectives = objectives
    .filter(o => o.status === 'in_progress')
    .sort((a, b) => (b.progress || 0) - (a.progress || 0))
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Objectives in Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {inProgressObjectives.map((objective) => (
            <ObjectiveCard 
              key={objective.id}
              objective={objective}
              actions={cardActions}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
