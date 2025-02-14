'use client'

import React from 'react';
import { BaseCard } from '@/components/BaseCardSystem/BaseCard';
import { BaseCardGrid } from '@/components/BaseCardSystem/BaseCardGrid';
import { Task } from '@/types/tasks';
import { useTaskStore } from '@/store/taskStore';
import { useEffect } from 'react';

export default function TaskCardPage() {
  const { tasks, fetchTasks, updateTask, deleteTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Card actions for tasks
  const cardActions = [
    {
      label: 'Modify',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, task);
          fetchTasks();
        } catch (error) {
          console.error('Error modifying task:', error);
        }
      },
      variant: 'default' as const,
    },
    {
      label: 'Mark In Progress',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, { status: 'in_progress' });
          fetchTasks();
        } catch (error) {
          console.error('Error marking task in progress:', error);
        }
      },
      variant: 'default' as const,
    },
    {
      label: 'Mark Complete',
      action: async (task: Task) => {
        try {
          await updateTask(task.id, { status: 'completed' });
          fetchTasks();
        } catch (error) {
          console.error('Error marking task complete:', error);
        }
      },
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      action: async (task: Task) => {
        try {
          await deleteTask(task.id);
          fetchTasks();
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      },
      variant: 'destructive' as const,
    },
  ];

  // Render function for task card content
  const renderTaskContent = (task: Task) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${
          task.status === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : task.status === 'in_progress'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
      <p className="text-gray-600">{task.description}</p>
      <div className="text-sm text-gray-500">
        Last updated: {new Date(task.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Task Card System</h1>
      
      <div className="space-y-8">
        {/* Single BaseCard example */}
        {tasks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Single Task Card Example</h2>
            <BaseCard
              item={tasks[0]}
              renderContent={renderTaskContent}
              title="Task"
              actions={cardActions}
            />
          </div>
        )}

        {/* BaseCardGrid example */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Task Card Grid</h2>
          <BaseCardGrid
            items={tasks}
            renderContent={renderTaskContent}
            cardTitle="Task"
            actions={cardActions}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          />
        </div>
      </div>
    </div>
  );
}