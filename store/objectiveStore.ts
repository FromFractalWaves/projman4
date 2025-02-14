'use client'

import { create } from 'zustand'
import { Objective } from '@prisma/client'
import { StateCreator } from 'zustand'

type ObjectiveInput = Omit<Objective, 'id' | 'createdAt' | 'updatedAt'>

interface ObjectiveState {
  objectives: Objective[]
  isLoading: boolean
  error: string | null
  fetchObjectives: () => Promise<void>
  addObjective: (objective: ObjectiveInput) => Promise<void>
  updateObjective: (id: string, updates: Partial<Objective>) => Promise<void>
  deleteObjective: (id: string) => Promise<void>
}

export const useObjectiveStore = create<ObjectiveState>((set, get) => ({
  objectives: [],
  isLoading: false,
  error: null,

  fetchObjectives: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/objectives')
      const objectives = await response.json()
      set({ objectives, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch objectives', isLoading: false })
    }
  },

  addObjective: async (objectiveData: ObjectiveInput) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/objectives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objectiveData),
      })
      const newObjective = await response.json()
      set(state => ({ objectives: [...state.objectives, newObjective], isLoading: false }))
    } catch (error) {
      set({ error: 'Failed to add objective', isLoading: false })
    }
  },

  updateObjective: async (id: string, updates: Partial<Objective>) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/objectives/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      const updatedObjective = await response.json()
      set(state => ({
        objectives: state.objectives.map(objective => 
          objective.id === id ? updatedObjective : objective
        ),
        isLoading: false
      }))
    } catch (error) {
      set({ error: 'Failed to update objective', isLoading: false })
    }
  },

  deleteObjective: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      await fetch(`/api/objectives/${id}`, {
        method: 'DELETE',
      })
      set(state => ({
        objectives: state.objectives.filter(objective => objective.id !== id),
        isLoading: false
      }))
    } catch (error) {
      set({ error: 'Failed to delete objective', isLoading: false })
    }
  },
}))