// app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { SimpleDashboard } from '@/components/dashboard/SimpleDashboard';
import { Task } from '@/types/tasks';
import { Project } from '@/types/projects';
import { Objective } from '@/types/objectives';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  // Example data fetching—adjust as needed
  useEffect(() => {
    async function fetchData() {
      try {
        const [tasksRes, projectsRes, objectivesRes] = await Promise.all([
          fetch('/api/tasks'),
          fetch('/api/projects'),
          fetch('/api/objectives'),
        ]);

        const tasksData = await tasksRes.json();
        const projectsData = await projectsRes.json();
        const objectivesData = await objectivesRes.json();

        setTasks(tasksData);
        setProjects(projectsData);
        setObjectives(objectivesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
    fetchData();
  }, []);

  // API calls for adding new items
  const handleAddTask = async (newTask: Task) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const createdTask = await res.json();
      setTasks(prev => [createdTask, ...prev]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleAddProject = async (newProject: Project) => {
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      const createdProject = await res.json();
      setProjects(prev => [createdProject, ...prev]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleAddObjective = async (newObjective: Objective) => {
    try {
      const res = await fetch('/api/objectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObjective),
      });
      const createdObjective = await res.json();
      setObjectives(prev => [createdObjective, ...prev]);
    } catch (error) {
      console.error('Error adding objective:', error);
    }
  };

  return (
    <SimpleDashboard
      tasks={tasks}
      projects={projects}
      objectives={objectives}
      onAddTask={handleAddTask}
      onAddProject={handleAddProject}
      onAddObjective={handleAddObjective}
    />
  );
}
