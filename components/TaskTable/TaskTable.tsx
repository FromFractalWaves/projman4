// app/components/TaskTable/TaskTable.tsx
import { DataTable } from '../DataTableControlGroup/DataTable'
import { Task } from './TaskTypes'
import { useTaskStore } from '@/store/taskStore'

export function TaskTable() {
  const { tasks, updateTask, deleteTask } = useTaskStore()

  const columns = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'createdAt', header: 'Created At' },
  ]

  const actions = [
    {
      label: 'Edit',
      action: (task: Task) => {
        // Implement edit action
      },
    },
    {
      label: 'Delete',
      action: (task: Task) => deleteTask(task.id),
      variant: 'destructive',
    },
  ]

  return (
    <DataTable<Task>
      data={tasks}
      columns={columns}
      actions={actions}
      title="Tasks"
      addNewItem={() => {
        // Implement add new task
      }}
    />
  )
}