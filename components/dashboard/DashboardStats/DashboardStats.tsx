import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjectStore } from '@/store/projectStore';
import { Project } from '@/types/projects';
import { Boxes, Timer, AlertCircle } from "lucide-react";

export function ProjectStats() {
  const { projects, isLoading, error } = useProjectStore();

  if (error) {
    return (
      <Card className="bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600 text-center">
            Error loading project stats. Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate project statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status !== 'completed').length;
  const highPriorityProjects = projects.filter(
    p => (p.priority === 'high' || p.priority === 'critical') && p.status !== 'completed'
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-blue-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Boxes className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{totalProjects}</div>
          <p className="text-xs text-blue-600/80">All time projects</p>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <Timer className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{activeProjects}</div>
          <p className="text-xs text-green-600/80">Currently in progress</p>
        </CardContent>
      </Card>

      <Card className="bg-orange-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-700">{highPriorityProjects}</div>
          <p className="text-xs text-orange-600/80">Active high/critical priority</p>
        </CardContent>
      </Card>
    </div>
  );
}