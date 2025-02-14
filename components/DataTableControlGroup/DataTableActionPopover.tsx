// app/components/DataTableControlGroup/DataTableActionPopover.tsx
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Button } from "@/components/ui/button"
  
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
          <Button variant="outline" size="sm">
            Actions
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
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
    )
  }