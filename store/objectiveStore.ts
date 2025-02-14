'use client'

import { create } from 'zustand'
import { Objective, ObjectiveInput } from '@/types/objectives'

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
      if (!response.ok) throw new Error('Failed to fetch objectives')
      const objectives = await response.json()
      set({ objectives, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch objectives', isLoading: false })
      console.error('Fetch error:', error)
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
      if (!response.ok) throw new Error('Failed to add objective')
      const newObjective = await response.json()
      
      // Update state with the new objective
      set(state => ({
        objectives: [newObjective, ...state.objectives],
        isLoading: false,
        error: null
      }))
      
      // Refresh the objectives to ensure consistency
      get().fetchObjectives()
    } catch (error) {
      set({ error: 'Failed to add objective', isLoading: false })
      console.error('Add error:', error)
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
      if (!response.ok) throw new Error('Failed to update objective')
      const updatedObjective = await response.json()
      
      set(state => ({
        objectives: state.objectives.map(objective => 
          objective.id === id ? updatedObjective : objective
        ),
        isLoading: false,
        error: null
      }))
    } catch (error) {
      set({ error: 'Failed to update objective', isLoading: false })
      console.error('Update error:', error)
    }
  },

  deleteObjective: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch(`/api/objectives/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete objective')
      
      set(state => ({
        objectives: state.objectives.filter(objective => objective.id !== id),
        isLoading: false,
        error: null
      }))
    } catch (error) {
      set({ error: 'Failed to delete objective', isLoading: false })
      console.error('Delete error:', error)
    }
  },
}))