'use client'

import React from 'react';
import { BaseCardGrid } from '@/components/BaseCardSystem/BaseCardGrid';
import { Project } from '@/types/projects';
import { useProjectStore } from '@/store/projectStore';
import { useEffect } from 'react';
import { ProjectCard } from '@/components/ProjectCards/ProjectCards';

export default function ProjectCardPage() {
  const { 
    projects, 
    fetchProjects, 
    updateProject, 
    deleteProject 
  } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Card actions for projects
  const cardActions = [
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
      variant: 'default' as const,
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
      variant: 'default' as const,
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
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      action: async (project: Project) => {
        try {
          await deleteProject(project.id);
          fetchProjects();
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      },
      variant: 'destructive' as const,
    },
  ];

  // Render function for project card content
  const renderProjectContent = (project: Project) => (
    <ProjectCard project={project} actions={cardActions} />
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Project Card System</h1>
      
      <div className="space-y-8">
        {/* Single ProjectCard example */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Single Project Card Example</h2>
            <ProjectCard
              project={projects[0]}
              actions={cardActions}
            />
          </div>
        )}

        {/* ProjectCard Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Project Card Grid</h2>
          <BaseCardGrid
            items={projects}
            renderContent={renderProjectContent}
            cardTitle="Project"
            actions={cardActions}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          />
        </div>
      </div>
    </div>
  );
}