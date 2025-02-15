'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface BaseDashboardWidgetProps {
  /** Widget title displayed in the card header */
  title: string;
  /** The widget’s content (e.g. a grid, table, or chart) */
  children: React.ReactNode;
}

export function BaseDashboardWidget({ title, children }: BaseDashboardWidgetProps) {
  return (
    <Card className="shadow hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
