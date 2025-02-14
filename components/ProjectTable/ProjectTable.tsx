'use client';

import { BaseTable } from '@/components/BaseTableSystem/BaseTable';
import { useProjectStore } from '@/store/projectStore';
import { Project } from '@/types/projects';
import { useEffect } from 'react';

export function ProjectTable() {
  const { projects, updateProject, deleteProject, addProject, fetchProjects } = useProjectStore();

  // Fetch projects when the component mounts.
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const columns = [
    { accessorKey: 'title' as keyof Project, header: 'Title' },
    { accessorKey: 'status' as keyof Project, header: 'Status' },
    { accessorKey: 'priority' as keyof Project, header: 'Priority' },
    { accessorKey: 'progress' as keyof Project, header: 'Progress' },
    { accessorKey: 'dueDate' as keyof Project, header: 'Due Date' },
    { accessorKey: 'description' as keyof Project, header: 'Description' },
    { accessorKey: 'updatedAt' as keyof Project, header: 'Last Updated' },
  ];

  const actions = [
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
      variant: 'destructive',
    },
  ];

  const defaultNewItem = {
    title: '',
    description: '',
    status: 'todo' as const,
    priority: 'medium' as const,
    progress: 0,
    dueDate: null,
  };

  return (
    <BaseTable<Project>
      data={projects}
      columns={columns}
      actions={actions}
      title="Projects"
      addNewItem={addProject}
      defaultNewItem={defaultNewItem}
    />
  );
}
