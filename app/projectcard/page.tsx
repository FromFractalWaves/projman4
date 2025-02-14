// app/projectcard/page.tsx
'use client'

import React from 'react';
import { BaseCard } from '@/components/BaseCardSystem/BaseCard';
import { BaseCardGrid } from '@/components/BaseCardSystem/BaseCardGrid';
import { Project } from '@/types/projects';
import { useProjectStore } from '@/store/projectStore';
import { useEffect } from 'react';

export default function ProjectCardPage() {
  const { projects, fetchProjects, updateProject, deleteProject } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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

  const renderProjectContent = (project: Project) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            project.status === 'completed' 
              ? 'bg-green-100 text-green-800' 
              : project.status === 'in_progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {project.status === 'in_progress' ? 'In Progress' : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            project.priority === 'critical'
              ? 'bg-red-100 text-red-800'
              : project.priority === 'high'
              ? 'bg-orange-100 text-orange-800'
              : project.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
          </span>
        </div>
      </div>
      <p className="text-gray-600">{project.description}</p>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
        {project.dueDate && (
          <div>
            <span className="font-medium">Due: </span>
            {new Date(project.dueDate).toLocaleDateString()}
          </div>
        )}
        <div>
          <span className="font-medium">Updated: </span>
          {new Date(project.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Project Card System</h1>
      
      <div className="space-y-8">
        {/* Single BaseCard example */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Single Project Card Example</h2>
            <BaseCard
              item={projects[0]}
              renderContent={renderProjectContent}
              title="Project"
              actions={cardActions}
            />
          </div>
        )}

        {/* BaseCardGrid example */}
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