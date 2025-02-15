// components/dashboard/IntegratedDashboard/IntegratedDashboard.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid, Table as TableIcon } from 'lucide-react';

// Import base components
import { BaseDashboardLayout } from '@/components/base/BaseDashboard/BaseDashboardLayout';
import { DashboardStats } from '../DashboardStats/DashboardStats';

// Import entity-specific components
import { TaskCard } from '@/components/entityType/task/TaskCards';
import { ProjectCard } from '@/components/entityType/project/ProjectCards';
import { ObjectiveCard } from '@/components/entityType/objective/Objectivecards';
import { TaskTable } from '@/components/entityType/task/TaskTable';
import { ProjectTable } from '@/components/entityType/project/ProjectTable';
import { ObjectiveTable } from '@/components/entityType/objective/ObjectiveTable';

// Import stores
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useObjectiveStore } from '@/store/objectiveStore';

// Import shared utilities and configs
import { createTaskActions, createProjectActions, createObjectiveActions } from '../shared/actionConfigs';
import { createDashboardStats } from '../shared/statsConfig';
import { DashboardHeader } from '../DashboardLayout/DashboardHeader';

// Import types
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';
import { Status } from '@/types/base';

type ViewMode = 'card' | 'table';
interface ViewModes {
  tasks: ViewMode;
  projects: ViewMode;
  objectives: ViewMode;
}

export function IntegratedDashboard() {
  // Initialize stores
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    fetchTasks,
    isLoading: tasksLoading
  } = useTaskStore();

  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    fetchProjects,
    isLoading: projectsLoading
  } = useProjectStore();

  const {
    objectives,
    addObjective,
    updateObjective,
    deleteObjective,
    fetchObjectives,
    isLoading: objectivesLoading
  } = useObjectiveStore();

  // View mode state
  const [viewModes, setViewModes] = React.useState<ViewModes>({
    tasks: 'card',
    projects: 'card',
    objectives: 'card'
  });

  // Fetch data on mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchTasks(),
          fetchProjects(),
          fetchObjectives()
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [fetchTasks, fetchProjects, fetchObjectives]);

  // Create dashboard stats
  const stats = createDashboardStats(tasks, projects, objectives);

  // Generate action configurations
  const taskActions = createTaskActions(updateTask, deleteTask, fetchTasks);
  const projectActions = createProjectActions(updateProject, deleteProject, fetchProjects);
  const objectiveActions = createObjectiveActions(updateObjective, deleteObjective, fetchObjectives);

  // Header component with add/view toggle functionality
  const header = (
    <DashboardHeader
      onAddTask={addTask}
      onAddProject={addProject}
      onAddObjective={addObjective}
      viewModes={viewModes}
      onToggleView={(entityType) => setViewModes(prev => ({
        ...prev,
        [entityType]: prev[entityType] === 'card' ? 'table' : 'card'
      }))}
    />
  );

  const renderEntitySection = (
    title: string,
    items: any[],
    CardComponent: any,
    TableComponent: any,
    actions: any[],
    viewMode: ViewMode
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {viewMode === 'card' ? (
          <div className="space-y-4">
            {items.map(item => (
              <CardComponent
                key={item.id}
                {...{ [title.toLowerCase().slice(0, -1)]: item }}
                actions={actions}
              />
            ))}
          </div>
        ) : (
          <TableComponent />
        )}
      </CardContent>
    </Card>
  );

  return (
    <BaseDashboardLayout header={header}>
      {/* Stats Section */}
      <div className="mb-6">
        <DashboardStats
          stats={stats}
          isLoading={tasksLoading || projectsLoading || objectivesLoading}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          {renderEntitySection(
            'Projects',
            projects,
            ProjectCard,
            ProjectTable,
            projectActions,
            viewModes.projects
          )}
        </div>
        <div className="lg:col-span-1">
          {renderEntitySection(
            'Objectives',
            objectives,
            ObjectiveCard,
            ObjectiveTable,
            objectiveActions,
            viewModes.objectives
          )}
        </div>
        <div className="lg:col-span-1">
          {renderEntitySection(
            'Tasks',
            tasks,
            TaskCard,
            TaskTable,
            taskActions,
            viewModes.tasks
          )}
        </div>
      </div>
    </BaseDashboardLayout>
  );
}

export default IntegratedDashboard;