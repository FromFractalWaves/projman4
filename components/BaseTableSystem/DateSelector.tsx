import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

export interface DateField {
  label: string;
  value: Date | null;
  enabled: boolean;
}

interface DateSelectorProps {
  // Allow any string key with DateField values.
  dates: { [key: string]: DateField };
  onUpdate: (key: string, updates: Partial<DateField>) => void;
}

export function DateSelector({ dates, onUpdate }: DateSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Calendar className="h-4 w-4 mr-2" />
          Manage Dates
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          {Object.entries(dates).map(([key, field]) => (
            <div key={key} className="grid gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`enable-${key}`}
                  checked={field.enabled}
                  onChange={(e) => onUpdate(key, { enabled: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor={`enable-${key}`} className="text-sm font-medium">
                  {field.label}
                </Label>
              </div>
              {field.enabled && (
                <Input
                  type="date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null;
                    onUpdate(key, { value: date });
                  }}
                  className="h-8 text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateSelector;
