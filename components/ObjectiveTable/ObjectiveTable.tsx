import { BaseTable } from '../BaseTableSystem/BaseTable';
import { useObjectiveStore } from '@/store/objectiveStore';
import { Objective } from '@/types/objectives';
import { useEffect } from 'react';

export function ObjectiveTable() {
  const { objectives, updateObjective, deleteObjective, addObjective, fetchObjectives } = useObjectiveStore();

  // Add useEffect to fetch objectives when component mounts
  useEffect(() => {
    fetchObjectives();
  }, [fetchObjectives]);

  const columns = [
    {
      accessorKey: 'title' as keyof Objective,
      header: 'Title'
    },
    {
      accessorKey: 'status' as keyof Objective,
      header: 'Status'
    },
    {
      accessorKey: 'priority' as keyof Objective,
      header: 'Priority'
    },
    {
      accessorKey: 'progress' as keyof Objective,
      header: 'Progress'
    },
    {
      accessorKey: 'dueDate' as keyof Objective,
      header: 'Due Date'
    },
    {
      accessorKey: 'description' as keyof Objective,
      header: 'Description'
    },
    {
      accessorKey: 'updatedAt' as keyof Objective,
      header: 'Last Updated'
    }
  ];

  const renderCustomCell = (item: Objective, key: keyof Objective) => {
    if (key === 'status') {
      return (
        <span className={
          item.status === 'completed' ? 'text-green-600' :
          item.status === 'in_progress' ? 'text-blue-600' :
          'text-gray-600'
        }>
          {item.status === 'in_progress' ? 'In Progress' :
           item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      );
    }
    if (key === 'priority') {
      return (
        <span className={
          item.priority === 'critical' ? 'text-red-600' :
          item.priority === 'high' ? 'text-orange-600' :
          item.priority === 'medium' ? 'text-yellow-600' :
          'text-green-600'
        }>
          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
        </span>
      );
    }
    if (key === 'progress') {
      return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${item.progress}%` }}
          ></div>
        </div>
      );
    }
    if (key === 'dueDate' && item.dueDate) {
      return new Date(item.dueDate).toLocaleDateString();
    }
    return null;
  };

  const actions = [
    {
      label: 'Modify',
      action: async (objective: Objective) => {
        try {
          await updateObjective(objective.id, objective);
          // Fetch objectives after successful update
          fetchObjectives();
        } catch (error) {
          console.error('Error modifying objective:', error);
        }
      },
      variant: 'default' as const
    },
    {
      label: 'Mark In Progress',
      action: async (objective: Objective) => {
        try {
          await updateObjective(objective.id, { status: 'in_progress' });
          fetchObjectives();
        } catch (error) {
          console.error('Error marking objective in progress:', error);
        }
      },
      variant: 'default' as const
    },
    {
      label: 'Mark Complete',
      action: async (objective: Objective) => {
        try {
          await updateObjective(objective.id, { status: 'completed' });
          fetchObjectives();
        } catch (error) {
          console.error('Error marking objective complete:', error);
        }
      },
      variant: 'default' as const
    },
    {
      label: 'Delete',
      action: async (objective: Objective) => {
        try {
          await deleteObjective(objective.id);
          fetchObjectives();
        } catch (error) {
          console.error('Error deleting objective:', error);
        }
      },
      variant: 'destructive' as const
    }
  ];

  const handleAddNewObjective = async (objectiveData: Objective) => {
    try {
      console.log('Adding new objective:', objectiveData);
      await addObjective({
        title: objectiveData.title,
        description: objectiveData.description,
        status: objectiveData.status,
        priority: objectiveData.priority,
        progress: objectiveData.progress,
        dueDate: objectiveData.dueDate
      });
      console.log('Successfully added objective');
      // Fetch objectives after successful addition
      fetchObjectives();
    } catch (error) {
      console.error('Error adding objective:', error);
    }
  };

  const defaultNewItem = {
    title: '',
    description: '',
    status: 'todo' as const,
    priority: 'medium' as const,
    progress: 0,
    dueDate: null
  };

  return (
    <BaseTable<Objective>
      data={objectives}
      columns={columns}
      actions={actions}
      title="Objectives"
      addNewItem={handleAddNewObjective}
      renderCustomCell={renderCustomCell}
      defaultNewItem={defaultNewItem}
    />
  );
}