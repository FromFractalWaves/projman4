'use client';

import React from 'react';
import { BaseCard } from './BaseCard';

export interface BaseCardGridProps<T> {
  // The list of items to display.
  items: T[];
  // A function to render each card’s content.
  renderContent: (item: T) => React.ReactNode;
  // An optional title that can be passed to every card.
  cardTitle?: string;
  // Optional actions for every card.
  actions?: Array<{ 
    label: string;
    action: (item: T) => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  }>;
  // Optional additional className for the grid container.
  gridClassName?: string;
}

export function BaseCardGrid<T>({
  items,
  renderContent,
  cardTitle,
  actions,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
}: BaseCardGridProps<T>): JSX.Element {
  return (
    <div className={gridClassName}>
      {items.map((item: any) => (
        // We assume each item has a unique "id" property.
        <div key={item.id}>
          <BaseCard<T>
            item={item}
            renderContent={renderContent}
            title={cardTitle}
            actions={actions}
          />
        </div>
      ))}
    </div>
  );
}
