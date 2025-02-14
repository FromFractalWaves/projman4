'use client';

import React from 'react';
import { BaseCardGrid } from '@/components/BaseCardSystem/BaseCardGrid';

interface TestItem {
  id: string;
  title: string;
  description: string;
  status: string;
}

const testItems: TestItem[] = [
  { id: '1', title: 'Test Item 1', description: 'This is the description for item 1.', status: 'active' },
  { id: '2', title: 'Test Item 2', description: 'This is the description for item 2.', status: 'inactive' },
  { id: '3', title: 'Test Item 3', description: 'This is the description for item 3.', status: 'active' },
];

const actions = [
  {
    label: 'Alert',
    action: (item: TestItem) => alert(`Item clicked: ${item.title}`),
    variant: 'default',
  },
];

export default function BaseCardTestPage() {
  const renderContent = (item: TestItem) => (
    <div>
      <p className="font-bold">{item.title}</p>
      <p>{item.description}</p>
      <p className="text-sm text-gray-500">Status: {item.status}</p>
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">BaseCard Test</h1>
      <BaseCardGrid<TestItem>
        items={testItems}
        renderContent={renderContent}
        cardTitle="Test Card"
        actions={actions}
      />
    </div>
  );
}
