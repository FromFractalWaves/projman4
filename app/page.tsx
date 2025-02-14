

// app/page.tsx
import { TaskTable } from './components/TaskTable'

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Task Management</h1>
      <TaskTable />
    </div>
  )
}