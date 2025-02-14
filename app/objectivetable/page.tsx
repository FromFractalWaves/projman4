'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ObjectiveTable } from '@/components/ObjectiveTable/ObjectiveTable';
import { useObjectiveStore } from '@/store/objectiveStore';

export default function ObjectiveTablePage() {
  const { fetchObjectives } = useObjectiveStore();

  // Fetch objectives when the component mounts
  React.useEffect(() => {
    fetchObjectives();
  }, [fetchObjectives]);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Objective Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ObjectiveTable />
        </CardContent>
      </Card>
    </div>
  );
}