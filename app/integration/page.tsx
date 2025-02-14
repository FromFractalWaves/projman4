// app/integration-page.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TaskTable } from '@/components/TaskTable/TaskTable';
import { ProjectTable } from '@/components/ProjectTable/ProjectTable';
import { ObjectiveTable } from '@/components/ObjectiveTable/ObjectiveTable';

export default function IntegrationPage() {
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskTable />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectTable />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <ObjectiveTable />
        </CardContent>
      </Card>
    </div>
  );
}
