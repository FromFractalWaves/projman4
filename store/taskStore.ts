// app/store/taskStore.ts
'use client'

import { create } from 'zustand'
import { Task } from '@/types/task'
import { StateCreator } from 'zustand'

type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

interface TaskState {
  tasks: Task[]
  addTask: (task: TaskInput) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskState>((set: StateCreator<TaskState>) => ({
  tasks: [],
  addTask: (taskData: TaskInput) => set((state: TaskState) => ({
    tasks: [...state.tasks, {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]
  })),
  updateTask: (id: string, updates: Partial<Task>) => set((state: TaskState) => ({
    tasks: state.tasks.map((task: Task) => 
      task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
    )
  })),
  deleteTask: (id: string) => set((state: TaskState) => ({
    tasks: state.tasks.filter((task: Task) => task.id !== id)
  }))
}))