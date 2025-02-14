// components/DataTableControlGroup/DataTableActionPopover.tsx
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
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
  return (
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
              onClick={() => action.action(item)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}