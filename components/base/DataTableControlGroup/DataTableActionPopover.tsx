// components/DataTableControlGroup/DataTableActionPopover.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { BaseItem } from '@/types/DataTableTypes';

interface DataTableActionPopoverProps<T extends BaseItem> {
  item: T;
  actions: ActionConfig<T>[];
}

export function DataTableActionPopover<T extends BaseItem>({
  item,
  actions,
}: DataTableActionPopoverProps<T>) {
  const [isModifying, setIsModifying] = React.useState(false);
  const [modifiedItem, setModifiedItem] = React.useState<T>({...item});

  const handleModify = () => {
    const modifyAction = actions.find(action => action.label === 'Modify');
    if (modifyAction) {
      modifyAction.action(modifiedItem);
      setIsModifying(false);
    }
  };

  const renderModifyFields = () => {
    return Object.entries(item).map(([key, value]) => {
      // Skip internal fields
      if (['id', 'createdAt', 'updatedAt'].includes(key)) return null;

      return (
        <div key={key} className="grid gap-2">
          <Label htmlFor={key} className="capitalize">{key}</Label>
          {key === 'status' ? (
            <select
              id={key}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background"
              value={modifiedItem[key]}
              onChange={(e) => setModifiedItem({...modifiedItem, [key]: e.target.value})}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          ) : (
            <Input
              id={key}
              type="text"
              value={modifiedItem[key]}
              onChange={(e) => setModifiedItem({...modifiedItem, [key]: e.target.value})}
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
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsModifying(false)}>
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