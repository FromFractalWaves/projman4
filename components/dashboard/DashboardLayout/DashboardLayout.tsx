// components/Dashboard/DashboardLayout/DashboardLayout.tsx
'use client'

import React from 'react'
import { Card } from '@/components/ui/card'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid gap-6">{children}</div>
    </div>
  )
}