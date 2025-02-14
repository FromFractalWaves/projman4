'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TaskTable } from '@/components/TaskTable/TaskTable';
import { useTaskStore } from '@/store/taskStore';

export default function TaskTablePage() {
  const { fetchTasks } = useTaskStore();

  // Fetch tasks when the component mounts
  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskTable />
        </CardContent>
      </Card>
    </div>
  );
}