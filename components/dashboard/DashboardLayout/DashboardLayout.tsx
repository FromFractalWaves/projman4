import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { BaseDashboard } from '@/components/base/BaseDashboard/BaseDashboard';
import { BaseTable } from '@/components/base/BaseTableSystem/BaseTable';
import { BaseCardGrid } from '@/components/base/BaseCardSystem/BaseCardGrid';
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useObjectiveStore } from '@/store/objectiveStore';
import { DashboardHeader } from './DashboardHeader';
import { 
  renderTask, 
  renderProject, 
  renderObjective 
} from '../shared/cardRenders';
import { 
  createTaskActions, 
  createProjectActions, 
  createObjectiveActions 
} from '../shared/actionConfigs';
import { 
  defaultTask, 
  defaultProject, 
  defaultObjective 
} from '../shared/defaultItems';
import { createDashboardStats } from '../shared/statsConfig';

type ViewMode = 'table' | 'card';

interface DashboardSection {
  title: string;
  content: React.ReactNode;
}

// Extend BaseDashboardProps to include stats
interface ExtendedBaseDashboardProps {
  header: React.ReactNode;
  sections: DashboardSection[];
  stats?: Array<{
    title: string;
    total: number;
    active: number;
    icon: React.ReactNode;
    color: string;
  }>;
}

export function DashboardLayout() {
  // Entity store hooks
  const { 
    tasks, updateTask, fetchTasks, addTask, deleteTask,
    isLoading: tasksLoading, error: tasksError 
  } = useTaskStore();
  
  const { 
    projects, updateProject, fetchProjects, addProject, deleteProject,
    isLoading: projectsLoading, error: projectsError 
  } = useProjectStore();
  
  const { 
    objectives, updateObjective, fetchObjectives, addObjective, deleteObjective,
    isLoading: objectivesLoading, error: objectivesError 
  } = useObjectiveStore();

  // View mode state for each entity type
  const [viewModes, setViewModes] = React.useState({
    tasks: 'card' as ViewMode,
    projects: 'card' as ViewMode,
    objectives: 'card' as ViewMode
  });

  // Toggle view mode for an entity type
  const toggleViewMode = (entityType: keyof typeof viewModes) => {
    setViewModes(prev => ({
      ...prev,
      [entityType]: prev[entityType] === 'card' ? 'table' : 'card'
    }));
  };

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchTasks(), fetchProjects(), fetchObjectives()]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [fetchTasks, fetchProjects, fetchObjectives]);

  // Loading and error states
  const isLoading = tasksLoading || projectsLoading || objectivesLoading;
  const hasError = tasksError || projectsError || objectivesError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-64">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 text-center">
              Error loading dashboard data. Please try refreshing the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Configure dashboard header
  const header = (
    <DashboardHeader 
      onAddTask={addTask}
      onAddProject={addProject}
      onAddObjective={addObjective}
      viewModes={viewModes}
      onToggleView={toggleViewMode}
    />
  );

  // Create stats data
  const stats = createDashboardStats(tasks, projects, objectives);

  // Configure dashboard sections with view mode support
  const sections = [
    {
      title: 'Projects',
      content: viewModes.projects === 'card' ? (
        <BaseCardGrid
          items={projects}
          renderContent={renderProject}
          cardTitle="Project"
          actions={createProjectActions(updateProject, deleteProject, fetchProjects)}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        />
      ) : (
        <BaseTable
          data={projects}
          columns={[
            { accessorKey: 'title', header: 'Title' },
            { accessorKey: 'status', header: 'Status' },
            { accessorKey: 'priority', header: 'Priority' },
            { accessorKey: 'progress', header: 'Progress' },
            { accessorKey: 'dueDate', header: 'Due Date' },
            { accessorKey: 'description', header: 'Description' },
          ]}
          actions={createProjectActions(updateProject, deleteProject, fetchProjects)}
          title="Projects"
          defaultNewItem={defaultProject}
          isLoading={projectsLoading}
          error={projectsError}
        />
      )
    },
    {
      title: 'Objectives',
      content: viewModes.objectives === 'card' ? (
        <BaseCardGrid
          items={objectives}
          renderContent={renderObjective}
          cardTitle="Objective"
          actions={createObjectiveActions(updateObjective, deleteObjective, fetchObjectives)}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        />
      ) : (
        <BaseTable
          data={objectives}
          columns={[
            { accessorKey: 'title', header: 'Title' },
            { accessorKey: 'status', header: 'Status' },
            { accessorKey: 'priority', header: 'Priority' },
            { accessorKey: 'progress', header: 'Progress' },
            { accessorKey: 'dueDate', header: 'Due Date' },
            { accessorKey: 'description', header: 'Description' },
          ]}
          actions={createObjectiveActions(updateObjective, deleteObjective, fetchObjectives)}
          title="Objectives"
          defaultNewItem={defaultObjective}
          isLoading={objectivesLoading}
          error={objectivesError}
        />
      )
    },
    {
      title: 'Tasks',
      content: viewModes.tasks === 'card' ? (
        <BaseCardGrid
          items={tasks}
          renderContent={renderTask}
          cardTitle="Task"
          actions={createTaskActions(updateTask, deleteTask, fetchTasks)}
          gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        />
      ) : (
        <BaseTable
          data={tasks}
          columns={[
            { accessorKey: 'title', header: 'Title' },
            { accessorKey: 'status', header: 'Status' },
            { accessorKey: 'description', header: 'Description' },
          ]}
          actions={createTaskActions(updateTask, deleteTask, fetchTasks)}
          title="Tasks"
          defaultNewItem={defaultTask}
          isLoading={tasksLoading}
          error={tasksError}
        />
      )
    }
  ];

  return (
    <BaseDashboard 
      header={header} 
      sections={sections} 
      stats={stats}
    />
  );
}

export default DashboardLayout;