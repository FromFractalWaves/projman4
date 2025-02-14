'use client';

import React, { useEffect } from 'react';
import { TaskTable } from '@/components/TaskTable/TaskTable';
import { useTaskStore } from '@/store/taskStore';

export default function TasksPage() {
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="container mx-auto py-10">
      <TaskTable />
    </div>
  );
}
