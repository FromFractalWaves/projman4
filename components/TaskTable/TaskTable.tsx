// components/TaskTable/TaskTable.tsx
import { useEffect } from 'react';
import { BaseTable } from '../BaseTableSystem/BaseTable';
import { Task } from '@prisma/client';
import { useTaskStore } from '@/store/taskStore';

export function TaskTable() {
  const { tasks, fetchTasks, updateTask, deleteTask, addTask, isLoading } = useTaskStore();

  useEffect(() => {
    console.log('TaskTable mounted');
    fetchTasks();
  }, [fetchTasks]);

  // Add logging to see when tasks change
  useEffect(() => {
    console.log('Current tasks:', tasks);
  }, [tasks]);

  const columns = [
    { 
      accessorKey: 'title' as keyof Task,
      header: 'Title'
    },
    { 
      accessorKey: 'status' as keyof Task,
      header: 'Status'
    },
    { 
      accessorKey: 'description' as keyof Task,
      header: 'Description'
    },
    { 
      accessorKey: 'updatedAt' as keyof Task,
      header: 'Last Updated'
    }
  ];

  const renderCustomCell = (item: Task, key: keyof Task) => {
    if (key === 'status') {
      return (
        <span className={
          item.status === 'completed' ? 'text-green-600' :
          item.status === 'in_progress' ? 'text-blue-600' :
          'text-gray-600'
        }>
          {item.status === 'in_progress' ? 'in progress' : item.status}
        </span>
      );
    }
    return null;
  };

  const actions = [
    {
      label: 'Modify',
      action: (task: Task) => {
        console.log('Modifying task:', task);
        updateTask(task.id, task);
      },
      variant: 'default' as const
    },
    {
      label: 'Mark In Progress',
      action: (task: Task) => {
        console.log('Marking task in progress:', task.id);
        updateTask(task.id, { status: 'in_progress' });
      },
      variant: 'default' as const
    },
    {
      label: 'Mark Complete',
      action: (task: Task) => {
        console.log('Marking task complete:', task.id);
        updateTask(task.id, { status: 'completed' });
      },
      variant: 'default' as const
    },
    {
      label: 'Delete',
      action: (task: Task) => {
        console.log('Deleting task:', task.id);
        deleteTask(task.id);
      },
      variant: 'destructive' as const
    }
  ];

  const handleAddNewTask = (taskData: Partial<Task>) => {
    console.log('Adding new task:', taskData);
    addTask({
      title: taskData.title || '',
      description: taskData.description || '',
      status: taskData.status || 'todo'
    });
  };

  const defaultNewItem = {
    title: '',
    description: '',
    status: 'todo' as const
  };

  if (isLoading) {
    console.log('Table is loading');
    return <div>Loading...</div>;
  }

  console.log('Rendering table with tasks:', tasks);
  return (
    <BaseTable<Task>
      data={tasks}
      columns={columns}
      actions={actions}
      title="Tasks"
      addNewItem={handleAddNewTask}
      renderCustomCell={renderCustomCell}
      defaultNewItem={defaultNewItem}
    />
  );
}