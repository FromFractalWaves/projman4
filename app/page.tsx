'use client'

import React from 'react'
import { TaskTable } from '@/components/TaskTable/TaskTable'

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <TaskTable />
    </div>
  )
}