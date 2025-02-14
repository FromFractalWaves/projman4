'use client'

import { create } from 'zustand'
import { Task } from '@prisma/client'
import { StateCreator } from 'zustand'

type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>

interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  addTask: (task: TaskInput) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/tasks')
      const tasks = await response.json()
      set({ tasks, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false })
    }
  },

  addTask: async (taskData: TaskInput) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
      const newTask = await response.json()
      set(state => ({ tasks: [...state.tasks, newTask], isLoading: false }))
    } catch (error) {
      set({ error: 'Failed to add task', isLoading: false })
    }
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      const updatedTask = await response.json()
      set(state => ({
        tasks: state.tasks.map(task => 
          task.id === id ? updatedTask : task
        ),
        isLoading: false
      }))
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false })
    }
  },

  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      })
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id),
        isLoading: false
      }))
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false })
    }
  },
}))