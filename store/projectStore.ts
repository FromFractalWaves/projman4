'use client';

import { create } from 'zustand';
import { Project, ProjectInput } from '@/types/projects';

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: ProjectInput) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      set({ projects, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', isLoading: false });
      console.error('Fetch error:', error);
    }
  },

  addProject: async (projectData: ProjectInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error('Failed to add project');
      const newProject = await response.json();
      set(state => ({
        projects: [newProject, ...state.projects],
        isLoading: false,
      }));
      get().fetchProjects();
    } catch (error) {
      set({ error: 'Failed to add project', isLoading: false });
      console.error('Add error:', error);
    }
  },

  updateProject: async (id: string, updates: Partial<Project>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update project');
      const updatedProject = await response.json();
      set(state => ({
        projects: state.projects.map(project => project.id === id ? updatedProject : project),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update project', isLoading: false });
      console.error('Update error:', error);
    }
  },

  deleteProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      set(state => ({
        projects: state.projects.filter(project => project.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete project', isLoading: false });
      console.error('Delete error:', error);
    }
  },
}));
