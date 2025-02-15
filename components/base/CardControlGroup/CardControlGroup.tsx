// components/base/CardControlGroup/CardControlGroup.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseCardGrid } from '@/components/base/BaseCardSystem/BaseCardGrid';
import { BaseCardItem, ActionConfig } from '@/types/BaseCardTypes';
// Import DateFields and DateSelector from your table system
import { DateFields } from '@/types/base';
import { DateSelector } from '@/components/base/BaseTableSystem/DateSelector';

export interface CardControlGroupProps<T extends BaseCardItem> {
  /** Array of items to display as cards. */
  data: T[];
  /** Function to render the content for each card. */
  renderContent: (item: T) => React.ReactNode;
  /** Optional title to display on every card. */
  cardTitle?: string;
  /** Optional actions for each card (e.g. Modify, Delete). */
  actions?: ActionConfig<T>[];
  /** Title for the control group header. */
  title: string;
  /** Callback to add a new item. */
  addNewItem?: (newItem: T) => void;
  /** Default values used to build the "Add New" form. */
  defaultNewItem?: Partial<T>;
  /** Optional additional CSS classes for the card grid container. */
  gridClassName?: string;
  /**
   * Optional date fields to include in the add new dialog.
   * If provided, a DateSelector will be rendered and its values will be merged into the new item.
   */
  dateFields?: DateFields;
}

export function CardControlGroup<T extends BaseCardItem>({
  data,
  renderContent,
  cardTitle,
  actions,
  title,
  addNewItem,
  defaultNewItem = {},
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
  dateFields,
}: CardControlGroupProps<T>): JSX.Element {
  const [isAddingNew, setIsAddingNew] = React.useState(false);
  const [newItem, setNewItem] = React.useState<Partial<T>>(defaultNewItem);

  // If dateFields prop is provided, manage separate state for it.
  const [dates, setDates] = React.useState<DateFields>(
    dateFields || {
      startOn: { label: 'Start On', value: null, enabled: false },
      started: { label: 'Started', value: null, enabled: false },
      dueDate: { label: 'Due Date', value: null, enabled: false },
    }
  );

  // Handle updates from the DateSelector.
  const handleDateUpdate = (key: string, updates: Partial<DateFields[string]>) => {
    setDates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
        // When disabling, clear the value.
        value: updates.enabled === false ? null : (updates.value ?? prev[key].value),
      },
    }));
    // Merge enabled date fields into newItem.
    if (updates.enabled) {
      setNewItem((prev) => ({
        ...prev,
        [key]: updates.value || null,
      }));
    } else {
      // Remove the field if disabled.
      const { [key]: _, ...rest } = newItem;
      setNewItem(rest as Partial<T>);
    }
  };

  // Render simple input fields for each property in defaultNewItem
  // (skipping common system fields and date fields).
  const renderAddFields = () => {
    return Object.entries(defaultNewItem).map(([key]) => {
      if (['id', 'createdAt', 'updatedAt', 'startOn', 'started', 'dueDate'].includes(key)) {
        return null;
      }
      return (
        <div key={key} className="grid gap-2">
          <Label htmlFor={key} className="capitalize">
            {key}
          </Label>
          <Input
            id={key}
            type="text"
            value={newItem[key as keyof T] ? String(newItem[key as keyof T]) : ''}
            onChange={(e) => setNewItem({ ...newItem, [key]: e.target.value })}
          />
        </div>
      );
    });
  };

  const handleAddNew = () => {
    if (addNewItem) {
      // Optionally, add any normalization or validations here.
      // newItem already contains merged date values (if any).
      addNewItem(newItem as T);
      setNewItem(defaultNewItem);
      // Reset dates if applicable.
      if (dateFields) {
        setDates(dateFields);
      }
      setIsAddingNew(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {addNewItem && (
            <Button onClick={() => setIsAddingNew(true)} size="sm">
              Add New
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <BaseCardGrid<T>
            items={data}
            renderContent={renderContent}
            cardTitle={cardTitle}
            actions={actions}
            gridClassName={gridClassName}
          />
        </CardContent>
      </Card>
      {addNewItem && (
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {renderAddFields()}
              {dateFields && (
                <div className="grid gap-2">
                  <Label className="font-semibold">Dates</Label>
                  <DateSelector dates={dates} onUpdate={handleDateUpdate} />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingNew(false);
                  setNewItem(defaultNewItem);
                  if (dateFields) {
                    setDates(dateFields);
                  }
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddNew}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
