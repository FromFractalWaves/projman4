import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from '@/components/ProjectCards/ProjectCards';
import { useProjectStore } from '@/store/projectStore';
import { Project, Priority } from '@/types/projects';
import { ActionConfig } from '@/types/BaseCardTypes';

// Define priority record type with numeric values
type PriorityWeight = Record<Priority, number>;

// Constants
const PRIORITY_WEIGHTS: PriorityWeight = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3
} as const;

const MAX_DISPLAYED_PROJECTS = 3;

interface ProjectSortParams {
  priority: Priority;
  progress: number;
}

// Type guard to check if project is high priority
function isHighPriorityProject(project: Project): boolean {
  return project.priority === 'high' || project.priority === 'critical';
}

// Helper function to compare projects by priority and progress
function compareProjects(a: ProjectSortParams, b: ProjectSortParams): number {
  // Sort by priority first
  const priorityDiff = PRIORITY_WEIGHTS[a.priority] - PRIORITY_WEIGHTS[b.priority];
  if (priorityDiff !== 0) return priorityDiff;
  
  // Then by progress
  return b.progress - a.progress;
}

export function DashboardProjects() {
  const { 
    projects, 
    updateProject, 
    isLoading,
    error,
    fetchProjects 
  } = useProjectStore();

  // Define actions with proper typing
  const cardActions: ActionConfig<Project>[] = [
    {
      label: 'Modify',
      action: async (project: Project) => {
        try {
          await updateProject(project.id, project);
          fetchProjects();
        } catch (error) {
          console.error('Error modifying project:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark In Progress',
      action: async (project: Project) => {
        try {
          await updateProject(project.id, { status: 'in_progress' });
          fetchProjects();
        } catch (error) {
          console.error('Error marking project in progress:', error);
        }
      },
      variant: 'default',
    },
    {
      label: 'Mark Complete',
      action: async (project: Project) => {
        try {
          await updateProject(project.id, { status: 'completed' });
          fetchProjects();
        } catch (error) {
          console.error('Error marking project complete:', error);
        }
      },
      variant: 'default',
    }
  ];

  // Get high priority and in-progress projects
  const priorityProjects = projects
    .filter(p => isHighPriorityProject(p) && p.status !== 'completed')
    .sort((a, b) => compareProjects(
      { priority: a.priority, progress: a.progress },
      { priority: b.priority, progress: b.progress }
    ))
    .slice(0, MAX_DISPLAYED_PROJECTS);

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600 text-center">
            Error loading projects. Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>High Priority Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: MAX_DISPLAYED_PROJECTS }).map((_, index) => (
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
        ) : priorityProjects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {priorityProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                actions={cardActions}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No high priority projects at the moment.
          </p>
        )}
      </CardContent>
    </Card>
  );
}