import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from '@/components/ProjectCards/ProjectCards';
import { useProjectStore } from '@/store/projectStore';
import { Project } from '@/types/projects';
import { Loader2 } from 'lucide-react';
import { ActionConfig } from '@/types/BaseCardTypes';

export function DashboardProjects() {
  const { 
    projects, 
    updateProject, 
    isLoading,
    error,
    fetchProjects 
  } = useProjectStore();

  // Use the same action pattern as BaseCard/BaseTable
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
    .filter(p => 
      (p.priority === 'high' || p.priority === 'critical') && 
      p.status !== 'completed'
    )
    .sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { critical: 0, high: 1 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by progress
      return b.progress - a.progress;
    })
    .slice(0, 3);

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