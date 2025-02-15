import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";
import { BaseTableItem, ActionConfig } from '@/types/BaseTableTypes';
import { DateSelector, DateField } from "./DateSelector";

// Define a helper type for our date fields
interface DateFields {
  [key: string]: DateField;
  startOn: DateField;
  started: DateField;
  dueDate: DateField;
}

interface BaseTableActionPopoverProps<T extends BaseTableItem> {
  item: T;
  actions: ActionConfig<T>[];
}

export function BaseTableActionPopover<T extends BaseTableItem>({
  item,
  actions,
}: BaseTableActionPopoverProps<T>) {
  const [isModifying, setIsModifying] = React.useState(false);
  const [modifiedItem, setModifiedItem] = React.useState<T>({ ...item });

  // State for date fields in modify dialog. We initialize each date field
  // based on whether the item already has a value for that field.
  const [dates, setDates] = React.useState<DateFields>({
    startOn: { label: 'Start On', value: (item as any).startOn || null, enabled: !!(item as any).startOn },
    started: { label: 'Started', value: (item as any).started || null, enabled: !!(item as any).started },
    dueDate: { label: 'Due Date', value: (item as any).dueDate || null, enabled: !!(item as any).dueDate },
  });

  React.useEffect(() => {
    if (isModifying) {
      setModifiedItem({ ...item });
      setDates({
        startOn: { label: 'Start On', value: (item as any).startOn || null, enabled: !!(item as any).startOn },
        started: { label: 'Started', value: (item as any).started || null, enabled: !!(item as any).started },
        dueDate: { label: 'Due Date', value: (item as any).dueDate || null, enabled: !!(item as any).dueDate },
      });
    }
  }, [isModifying, item]);

  // Handle updates from the DateSelector popover.
  const handleDateUpdate = (key: string, updates: Partial<DateField>) => {
    setDates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
        // If disabled, clear the date value; otherwise, use the new value.
        value: updates.enabled === false ? null : (updates.value ?? prev[key].value),
      },
    }));

    if (updates.enabled) {
      setModifiedItem((prev) => ({
        ...prev,
        [key]: updates.value || null,
      }));
    } else {
      // Remove the date field from modifiedItem when disabled.
      const { [key]: _, ...rest } = modifiedItem;
      setModifiedItem(rest as T);
    }
  };

  const handleModify = () => {
    const modifyAction = actions.find(action => action.label === 'Modify');
    if (modifyAction) {
      // Normalize the status before sending to the API if needed.
      modifyAction.action(modifiedItem);
      setIsModifying(false);
    }
  };

  const handleClose = () => {
    setIsModifying(false);
    setModifiedItem({ ...item }); // Reset to original values.
  };

  // Render all fields except for system fields and the date fields.
  const renderModifyFields = () => {
    return Object.entries(item).map(([key, _]) => {
      if (['id', 'createdAt', 'updatedAt', 'startOn', 'started', 'dueDate'].includes(key))
        return null;

      return (
        <div key={key} className="grid gap-2">
          <Label htmlFor={key} className="capitalize">{key}</Label>
          {key === 'status' ? (
            <select
              id={key}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
              value={String(modifiedItem[key] || '')}
              onChange={(e) => setModifiedItem({ ...modifiedItem, [key]: e.target.value })}
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          ) : key === 'priority' ? (
            <select
              id={key}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
              value={String(modifiedItem[key] || '')}
              onChange={(e) => setModifiedItem({ ...modifiedItem, [key]: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          ) : (
            <Input
              id={key}
              type="text"
              value={String(modifiedItem[key] || '')}
              onChange={(e) => setModifiedItem({ ...modifiedItem, [key]: e.target.value })}
            />
          )}
        </div>
      );
    });
  };

  return (
    <>
      <Dialog open={isModifying} onOpenChange={setIsModifying}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="end">
            <div className="space-y-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    if (action.label === 'Modify') {
                      setIsModifying(true);
                    } else if (action.label === 'Mark In Progress') {
                      action.action({ ...item, status: 'in_progress' } as T);
                    } else if (action.label === 'Mark Complete') {
                      action.action({ ...item, status: 'completed' } as T);
                    } else {
                      action.action(item);
                    }
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {renderModifyFields()}
            <div className="grid gap-2">
              <Label>Dates</Label>
              <DateSelector dates={dates} onUpdate={handleDateUpdate} />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleModify}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
