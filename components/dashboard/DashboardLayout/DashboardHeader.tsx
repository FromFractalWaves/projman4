import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { DateSelector } from '@/components/base/BaseTableSystem/DateSelector';
import { Task, TaskInput } from '@/types/tasks';
import { Project, ProjectInput } from '@/types/projects';
import { Objective, ObjectiveInput } from '@/types/objectives';

interface DashboardHeaderProps {
  onAddTask: (task: TaskInput) => Promise<void>;
  onAddProject: (project: ProjectInput) => Promise<void>;
  onAddObjective: (objective: ObjectiveInput) => Promise<void>;
}

export function DashboardHeader({ 
  onAddTask, 
  onAddProject, 
  onAddObjective 
}: DashboardHeaderProps) {
  const [isAddingTask, setIsAddingTask] = React.useState(false);
  const [isAddingProject, setIsAddingProject] = React.useState(false);
  const [isAddingObjective, setIsAddingObjective] = React.useState(false);

  const [newTask, setNewTask] = React.useState({ 
    title: '', 
    description: '', 
    status: 'todo' as const 
  });
  
  const [newProject, setNewProject] = React.useState({
    title: '',
    description: '',
    status: 'todo' as const,
    priority: 'medium' as const,
    progress: 0,
    dueDate: null,
  });
  
  const [newObjective, setNewObjective] = React.useState({
    title: '',
    description: '',
    status: 'todo' as const,
    priority: 'medium' as const,
    progress: 0,
    dueDate: null,
  });

  const [dates, setDates] = React.useState({
    startOn: { label: 'Start On', value: null, enabled: false },
    started: { label: 'Started', value: null, enabled: false },
    dueDate: { label: 'Due Date', value: null, enabled: false },
  });

  const handleDateUpdate = (key: string, updates: any) => {
    setDates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
        value: updates.enabled === false ? null : (updates.value ?? prev[key].value),
      },
    }));

    const dateValue = updates.enabled ? updates.value || null : null;
    if (isAddingProject) {
      setNewProject(prev => ({ ...prev, [key]: dateValue }));
    }
    if (isAddingObjective) {
      setNewObjective(prev => ({ ...prev, [key]: dateValue }));
    }
  };

  const handleAddTask = async () => {
    try {
      await onAddTask(newTask);
      setIsAddingTask(false);
      setNewTask({ title: '', description: '', status: 'todo' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleAddProject = async () => {
    try {
      await onAddProject(newProject);
      setIsAddingProject(false);
      setNewProject({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        progress: 0,
        dueDate: null,
      });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleAddObjective = async () => {
    try {
      await onAddObjective(newObjective);
      setIsAddingObjective(false);
      setNewObjective({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        progress: 0,
        dueDate: null,
      });
    } catch (error) {
      console.error('Error adding objective:', error);
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <Button onClick={() => setIsAddingTask(true)} size="sm">
        <Plus className="w-4 h-4 mr-2" />
        New Task
      </Button>
      <Button onClick={() => setIsAddingProject(true)} size="sm">
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </Button>
      <Button onClick={() => setIsAddingObjective(true)} size="sm">
        <Plus className="w-4 h-4 mr-2" />
        New Objective
      </Button>

      {/* Task Dialog */}
      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsAddingTask(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Project Dialog */}
      <Dialog open={isAddingProject} onOpenChange={setIsAddingProject}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
                value={newProject.priority}
                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as any })}
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
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsAddingProject(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProject}>Add Project</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Objective Dialog */}
      <Dialog open={isAddingObjective} onOpenChange={setIsAddingObjective}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Objective</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newObjective.title}
                onChange={(e) => setNewObjective({ ...newObjective, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newObjective.description}
                onChange={(e) => setNewObjective({ ...newObjective, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
                value={newObjective.priority}
                onChange={(e) => setNewObjective({ ...newObjective, priority: e.target.value as any })}
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
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsAddingObjective(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddObjective}>Add Objective</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}