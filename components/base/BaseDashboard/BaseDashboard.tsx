import React from 'react';
import { BaseDashboardLayout } from './BaseDashboardLayout';
import { BaseDashboardWidget } from './BaseDashboardWidget';
import { DashboardStats } from '@/components/dashboard/DashboardStats/DashboardStats';

export interface DashboardSection {
  title: string;
  content: React.ReactNode;
}

export interface BaseDashboardProps {
  /** Header content for the dashboard */
  header: React.ReactNode;
  /** An array of dashboard sections to display in a grid */
  sections: DashboardSection[];
  /** Optional stats to display at the top of the dashboard */
  stats?: Array<{
    title: string;
    total: number;
    active: number;
    icon: React.ReactNode;
    color: string;
  }>;
}

export function BaseDashboard({ header, sections, stats }: BaseDashboardProps) {
  return (
    <BaseDashboardLayout header={header}>
      {stats && (
        <div className="mb-6">
          <DashboardStats 
            stats={stats}
            isLoading={false}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section, idx) => (
          <BaseDashboardWidget key={idx} title={section.title}>
            {section.content}
          </BaseDashboardWidget>
        ))}
      </div>
    </BaseDashboardLayout>
  );
}