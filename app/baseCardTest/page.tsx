'use client'

import React from 'react';
import { BaseCard } from '@/components/BaseCardSystem/BaseCard';
import { BaseCardGrid } from '@/components/BaseCardSystem/BaseCardGrid';

// Define a sample data type
interface TestItem {
  id: string;
  title: string;
  content: string;
  status: 'active' | 'completed';
}

export default function BaseCardTest() {
  // Sample data
  const items: TestItem[] = [
    { id: '1', title: 'First Card', content: 'This is the first card content', status: 'active' },
    { id: '2', title: 'Second Card', content: 'This is the second card content', status: 'completed' },
    { id: '3', title: 'Third Card', content: 'This is the third card content', status: 'active' },
  ];

  // Example actions for the cards
  const cardActions = [
    {
      label: 'Modify',
      action: (item: TestItem) => {
        console.log('Modify clicked for:', item.title);
      },
      variant: 'default' as const,
    },
    {
      label: 'Mark Complete',
      action: (item: TestItem) => {
        console.log('Mark Complete clicked for:', item.title);
      },
      variant: 'default' as const,
    },
    {
      label: 'Delete',
      action: (item: TestItem) => {
        console.log('Delete clicked for:', item.title);
      },
      variant: 'destructive' as const,
    },
  ];

  // Render function for card content
  const renderCardContent = (item: TestItem) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <span className={`px-2 py-1 rounded-full text-sm ${
          item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
      </div>
      <p className="text-gray-600">{item.content}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">BaseCard System Test</h1>
      
      <div className="space-y-8">
        {/* Single BaseCard example */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Single Card Example</h2>
          <BaseCard
            item={items[0]}
            renderContent={renderCardContent}
            title="Test Card"
            actions={cardActions}
          />
        </div>

        {/* BaseCardGrid example */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Card Grid Example</h2>
          <BaseCardGrid
            items={items}
            renderContent={renderCardContent}
            cardTitle="Grid Card"
            actions={cardActions}
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          />
        </div>
      </div>
    </div>
  );
}