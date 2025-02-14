// components/TaskTable/TaskTable.tsx
import { BaseTable } from '../BaseTableSystem/BaseTable';
import { Task } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';

export function TaskTable() {
  const { tasks, updateTask, deleteTask, addTask } = useTaskStore();

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
          item.status === 'in-progress' ? 'text-blue-600' :
          'text-gray-600'
        }>
          {item.status}
        </span>
      );
    }
    return null;
  };

  const actions = [
    {
      label: 'Modify',
      action: (task: Task) => updateTask(task.id, task),
      variant: 'default' as const
    },
    {
      label: 'Mark In Progress',
      action: (task: Task) => updateTask(task.id, { status: 'in-progress' }),
      variant: 'default' as const
    },
    {
      label: 'Mark Complete',
      action: (task: Task) => updateTask(task.id, { status: 'completed' }),
      variant: 'default' as const
    },
    {
      label: 'Delete',
      action: (task: Task) => deleteTask(task.id),
      variant: 'destructive' as const
    }
  ];

  const handleAddNewTask = (taskData: Task) => {
    addTask({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status
    });
  };

  const defaultNewItem = {
    title: '',
    description: '',
    status: 'todo' as const
  };

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