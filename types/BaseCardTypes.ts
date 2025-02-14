// types/BaseCardTypes.ts

import { ReactNode } from 'react';
import { BaseDataItem, BaseActionConfig } from './base';

export interface BaseCardItem extends BaseDataItem {
  [key: string]: any;
}

export type ActionConfig<T extends BaseCardItem> = BaseActionConfig<T>;

export interface BaseCardProps<T extends BaseCardItem> {
  item: T;
  renderContent: (item: T) => ReactNode;
  title?: string;
  actions?: ActionConfig<T>[];
  className?: string;
}

export interface BaseCardGridProps<T extends BaseCardItem> {
  items: T[];
  renderContent: (item: T) => ReactNode;
  cardTitle?: string;
  actions?: ActionConfig<T>[];
  gridClassName?: string;
}
