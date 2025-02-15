import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTaskStore } from '@/store/taskStore';
import { useProjectStore } from '@/store/projectStore';
import { useObjectiveStore } from '@/store/objectiveStore';
import { DashboardHeader } from '@/components/dashboard/DashboardLayout/DashboardHeader';
import { BaseDashboardLayout } from '@/components/base/BaseDashboard/BaseDashboardLayout';
import { TrendingUp } from 'lucide-react';

// Define ViewMode type explicitly
type ViewMode = 'card' | 'table';

interface ViewModes {
  tasks: ViewMode;
  projects: ViewMode;
  objectives: ViewMode;
}

// Define ProgressData type for chart data
interface ProgressData {
  date: string;
  tasks: number;
  projects: number;
  objectives: number;
}

export function EnhancedDashboard() {
  // Store hooks
  const { tasks, fetchTasks } = useTaskStore();
  const { projects, fetchProjects } = useProjectStore();
  const { objectives, fetchObjectives } = useObjectiveStore();

  // View mode state with correct typing
  const [viewModes, setViewModes] = useState<ViewModes>({
    tasks: 'card',
    projects: 'card',
    objectives: 'card'
  });

  // Animation state
  const [animate, setAnimate] = useState(false);

  // Progress tracking
  const getProgressData = (): ProgressData[] => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => ({
      date,
      tasks: tasks.filter(t => 
        t.status === 'completed' && 
        new Date(t.updatedAt).toISOString().split('T')[0] === date
      ).length,
      projects: projects.filter(p => 
        p.status === 'completed' && 
        new Date(p.updatedAt).toISOString().split('T')[0] === date
      ).length,
      objectives: objectives.filter(o => 
        o.status === 'completed' && 
        new Date(o.updatedAt).toISOString().split('T')[0] === date
      ).length,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchTasks(), fetchProjects(), fetchObjectives()]);
        setAnimate(true);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [fetchTasks, fetchProjects, fetchObjectives]);

  const progressData = getProgressData();

  return (
    <BaseDashboardLayout
      header={
        <DashboardHeader
          onAddTask={async () => {}}
          onAddProject={async () => {}}
          onAddObjective={async () => {}}
          viewModes={viewModes}
          onToggleView={(entityType) => 
            setViewModes(prev => ({
              ...prev,
              [entityType]: prev[entityType] === 'card' ? 'table' : 'card'
            }))
          }
        />
      }
    >
      <div className="space-y-6">
        {/* Progress Chart */}
        <Card className={`transition-all duration-500 delay-100 ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="#3b82f6" 
                    name="Tasks" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projects" 
                    stroke="#22c55e" 
                    name="Projects" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="objectives" 
                    stroke="#a855f7" 
                    name="Objectives" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseDashboardLayout>
  );
}

export default EnhancedDashboard;