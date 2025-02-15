// components/BaseCardSystem/BaseCard.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ActionConfig } from '@/types/BaseCardTypes';
import { BaseCardActionPopover } from './BaseCardActionPopover';

export interface BaseCardProps<T> {
  item: T;
  renderContent: (item: T) => React.ReactNode;
  title?: string;
  actions?: ActionConfig<T>[];
}

export function BaseCard<T>({ 
  item, 
  renderContent, 
  title, 
  actions 
}: BaseCardProps<T>): JSX.Element {
  return (
    <Card>
      {(title || actions) && (
        <CardHeader className="flex flex-row items-center justify-between">
          {title && <CardTitle>{title}</CardTitle>}
          {actions && actions.length > 0 && (
            <BaseCardActionPopover item={item} actions={actions} />
          )}
        </CardHeader>
      )}
      <CardContent>{renderContent(item)}</CardContent>
    </Card>
  );
}