'use client';

import React, { useEffect } from 'react';
import { ProjectTable } from '@/components/ProjectTable/ProjectTable';
import { useProjectStore } from '@/store/projectStore';

export default function ProjectsPage() {
  const { fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="container mx-auto py-10">
      <ProjectTable />
    </div>
  );
}
