import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, LayoutGrid, Table } from 'lucide-react';
import { DateSelector } from '@/components/base/BaseTableSystem/DateSelector';
import { TaskInput } from '@/types/tasks';
import { ProjectInput } from '@/types/projects';
import { ObjectiveInput } from '@/types/objectives';

type ViewMode = 'table' | 'card';
type EntityType = 'task' | 'project' | 'objective';

interface ViewModes {
  tasks: ViewMode;
  projects: ViewMode;
  objectives: ViewMode;
}

interface DashboardHeaderProps {
  onAddTask: (task: TaskInput) => Promise<void>;
  onAddProject: (project: ProjectInput) => Promise<void>;
  onAddObjective: (objective: ObjectiveInput) => Promise<void>;
  viewModes: ViewModes;
  onToggleView: (entityType: keyof ViewModes) => void;
}

export function DashboardHeader({ 
  onAddTask, 
  onAddProject, 
  onAddObjective,
  viewModes,
  onToggleView
}: DashboardHeaderProps) {
  const [isAdding, setIsAdding] = React.useState<EntityType | null>(null);
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
    if (isAdding === 'project' || isAdding === 'objective') {
      setForm(prev => ({ ...prev, [key]: updates.enabled ? updates.value || null : null }));
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

  // Helper function to get the view toggle button text and icon
  const getViewToggleProps = (entityType: keyof ViewModes) => {
    const isCardView = viewModes[entityType] === 'card';
    return {
      icon: isCardView ? <Table className="w-4 h-4 mr-2" /> : <LayoutGrid className="w-4 h-4 mr-2" />,
      text: `View as ${isCardView ? 'Table' : 'Cards'}`
    };
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Entity type sections */}
      {(['tasks', 'projects', 'objectives'] as const).map(entityType => (
        <div key={entityType} className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold capitalize">{entityType}</h2>
          <div className="flex gap-2">
            <Button 
              onClick={() => onToggleView(entityType)} 
              size="sm"
              variant="outline"
            >
              {getViewToggleProps(entityType).icon}
              {getViewToggleProps(entityType).text}
            </Button>
            <Button 
              onClick={() => {
                setIsAdding(entityType.slice(0, -1) as EntityType);
                setForm({ 
                  status: 'todo',
                  ...(entityType !== 'tasks' && { priority: 'medium', progress: 0 })
                });
              }} 
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {entityType.slice(0, -1)}
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={!!isAdding} onOpenChange={(open) => !open && setIsAdding(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add New {isAdding && isAdding.charAt(0).toUpperCase() + isAdding.slice(1)}
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