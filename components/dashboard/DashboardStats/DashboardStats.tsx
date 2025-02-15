// components/dashboard/DashboardStats.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListTodo, Target, CheckCircle2, Loader2 } from 'lucide-react';

interface Stat {
  title: string;
  total: number;
  active: number;
  icon: React.ReactNode;
  color: string;
}

interface DashboardStatsProps {
  stats: Stat[];
  isLoading: boolean;
  error?: string;
}

export function DashboardStats({ stats, isLoading, error }: DashboardStatsProps) {
  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600 text-center">
            Error loading stats.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array(3).fill(0).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="flex items-center justify-between pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card key={index} className={stat.color}>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.total}</div>
            <p className="text-xs text-muted-foreground">{stat.active} active</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
