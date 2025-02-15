'use client';

import React from 'react';
import { BaseDashboardLayout } from './BaseDashboardLayout';
import { BaseDashboardWidget } from './BaseDashboardWidget';

export interface DashboardSection {
  /** Title for the dashboard widget */
  title: string;
  /** Content for the widget—this can be any React element, such as a table or card grid */
  content: React.ReactNode;
}

export interface BaseDashboardProps {
  /** Header content for the dashboard (e.g. a title, user info, or navigation) */
  header: React.ReactNode;
  /** An array of dashboard sections to display in a grid */
  sections: DashboardSection[];
}

export function BaseDashboard({ header, sections }: BaseDashboardProps) {
  return (
    <BaseDashboardLayout header={header}>
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
