// components/dashboard/DashboardHeader.tsx
// 'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { DateSelector } from '@/components/base/BaseTableSystem/DateSelector';
import { TaskInput } from '@/types/tasks';
import { ProjectInput } from '@/types/projects';
import { ObjectiveInput } from '@/types/objectives';

interface DashboardHeaderProps {
  onAddTask: (task: TaskInput) => Promise<void>;
  onAddProject: (project: ProjectInput) => Promise<void>;
  onAddObjective: (objective: ObjectiveInput) => Promise<void>;
}

export function DashboardHeader({ onAddTask, onAddProject, onAddObjective }: DashboardHeaderProps) {
  const [isAdding, setIsAdding] = React.useState<'task' | 'project' | 'objective' | null>(null);
  const [form, setForm] = React.useState<any>({});
  const [dates, setDates] = React.useState({
    startOn: { label: 'Start On', value: null, enabled: false },
    started: { label: 'Started', value: null, enabled: false },
    dueDate: { label: 'Due Date', value: null, enabled: false },
  });

  const handleDateUpdate = (key: string, updates: any) => {
    setDates(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
        value: updates.enabled === false ? null : (updates.value ?? prev[key].value),
      },
    }));
    // Merge date into form if needed (for project/objective)
    if (isAdding === 'project' || isAdding === 'objective') {
      setForm((prev: any) => ({ ...prev, [key]: updates.enabled ? updates.value || null : null }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (isAdding === 'task') {
        await onAddTask(form);
      } else if (isAdding === 'project') {
        await onAddProject(form);
      } else if (isAdding === 'objective') {
        await onAddObjective(form);
      }
      setIsAdding(null);
      setForm({});
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const renderFormFields = () => {
    return (
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title || ''}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={form.description || ''}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>
        {isAdding !== 'task' && (
          <>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={form.priority || 'medium'}
                onChange={e => setForm({ ...form, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label>Dates</Label>
              <DateSelector dates={dates} onUpdate={handleDateUpdate} />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-4 mb-6">
      <Button onClick={() => { setIsAdding('task'); setForm({ status: 'todo' }); }} size="sm">
        <Plus className="w-4 h-4 mr-2" />
        New Task
      </Button>
      <Button onClick={() => { setIsAdding('project'); setForm({ status: 'todo', priority: 'medium', progress: 0 }); }} size="sm">
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </Button>
      <Button onClick={() => { setIsAdding('objective'); setForm({ status: 'todo', priority: 'medium', progress: 0 }); }} size="sm">
        <Plus className="w-4 h-4 mr-2" />
        New Objective
      </Button>

      <Dialog open={!!isAdding} onOpenChange={(open) => !open && setIsAdding(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAdding === 'task' && 'Add New Task'}
              {isAdding === 'project' && 'Add New Project'}
              {isAdding === 'objective' && 'Add New Objective'}
            </DialogTitle>
          </DialogHeader>
          {renderFormFields()}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsAdding(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
