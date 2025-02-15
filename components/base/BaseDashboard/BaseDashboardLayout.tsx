'use client';

import React from 'react';

export interface BaseDashboardLayoutProps {
  /** Content to display in the dashboard header */
  header: React.ReactNode;
  /** Main content (e.g. dashboard widgets) */
  children: React.ReactNode;
}

export function BaseDashboardLayout({ header, children }: BaseDashboardLayoutProps) {
  return (
    <div className="base-dashboard min-h-screen bg-gray-50">
      <header className="dashboard-header p-4 bg-white shadow">
        {header}
      </header>
      <main className="dashboard-content p-4">
        {children}
      </main>
    </div>
  );
}
