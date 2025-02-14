'use client'

import React, { useEffect } from 'react'
import { ObjectiveTable } from '@/components/ObjectiveTable/ObjectiveTable'
import { useObjectiveStore } from '@/store/objectiveStore'

export default function ObjectivesPage() {
  const { fetchObjectives } = useObjectiveStore()

  useEffect(() => {
    fetchObjectives()
  }, [fetchObjectives])

  return (
    <div className="container mx-auto py-10">
      <ObjectiveTable />
    </div>
  )
}