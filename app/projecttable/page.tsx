'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectTable } from '@/components/ProjectTable/ProjectTable';
import { useProjectStore } from '@/store/projectStore';

export default function ProjectTablePage() {
  const { fetchProjects } = useProjectStore();

  // Fetch projects when the component mounts
  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectTable />
        </CardContent>
      </Card>
    </div>
  );
}