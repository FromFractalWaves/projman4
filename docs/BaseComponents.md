# Base Component System

## Overview
The `base/` directory contains a set of foundational UI components designed to be reusable, extendable, and customizable across various applications. This system includes core UI elements such as Cards, Tables, and Dashboards, each built to provide flexible functionality while maintaining a consistent design pattern.

## Directory Structure
```
base/
├── BaseCardSystem/
│   ├── BaseCard.tsx
│   ├── BaseCardActionPopover.tsx
│   ├── BaseCardGrid.tsx
├── BaseDashboard/
│   ├── BaseDashboard.tsx
│   ├── BaseDashboardLayout.tsx
│   ├── BaseDashboardWidget.tsx
├── BaseTableSystem/
│   ├── BaseTable.tsx
│   ├── BaseTableActionPopover.tsx
│   ├── DateSelector.tsx
├── CardControlGroup/
│   ├── CardControlGroup.tsx
├── DataTableControlGroup/
│   ├── DataTable.tsx
│   ├── DataTableActionPopover.tsx
```

## BaseCardSystem

### `BaseCard.tsx`
A reusable card component that serves as a container for displaying structured content. It supports dynamic rendering of content and optional action buttons.
- **Props:**
  - `item`: The data object used to populate the card.
  - `renderContent`: Function to render custom content within the card.
  - `title`: Optional title for the card.
  - `actions`: Array of action configurations that determine available interactions.

### `BaseCardActionPopover.tsx`
A popover menu that provides contextual actions for a card.
- **Props:**
  - `item`: The data object related to the card.
  - `actions`: Array of configurable actions such as Modify, Delete, etc.

### `BaseCardGrid.tsx`
A grid layout for rendering multiple `BaseCard` components dynamically.
- **Props:**
  - `items`: Array of objects representing individual cards.
  - `renderContent`: Function to display the content of each card.
  - `cardTitle`: Optional title applied to each card.
  - `actions`: Array of actions available for each card.

## BaseDashboard

### `BaseDashboard.tsx`
A flexible dashboard container that organizes widgets and statistics.
- **Props:**
  - `header`: Header component for the dashboard.
  - `sections`: Array of dashboard sections, each containing a title and content.
  - `stats`: Optional statistics summary displayed at the top.

### `BaseDashboardLayout.tsx`
Defines the layout structure for the dashboard, including a header and content area.

### `BaseDashboardWidget.tsx`
A wrapper component for dashboard widgets, providing a card-style layout with a title and content area.

## BaseTableSystem

### `BaseTable.tsx`
A configurable table component for displaying structured data in a tabular format.
- **Props:**
  - `data`: Array of data objects to populate the table.
  - `columns`: Defines the structure of the table.
  - `actions`: Set of available actions for each row.
  - `title`: Optional table title.
  - `addNewItem`: Callback function for adding new items.

### `BaseTableActionPopover.tsx`
A contextual popover providing action options for table rows.
- **Props:**
  - `item`: The associated row data.
  - `actions`: Array of actions such as Modify, Delete, etc.

### `DateSelector.tsx`
A reusable date picker component for handling date selection and management within tables.

## CardControlGroup

### `CardControlGroup.tsx`
A control group component for managing a set of cards with actions and data entry capabilities.
- **Props:**
  - `data`: List of items to be displayed as cards.
  - `renderContent`: Function to render card content.
  - `title`: Group title.
  - `actions`: Actions available on each card.
  - `addNewItem`: Callback for adding a new item.

## DataTableControlGroup

### `DataTable.tsx`
A structured data table for displaying tabular information with action popovers.
- **Props:**
  - `data`: Data items for the table.
  - `columns`: Table structure definition.
  - `actions`: Actions for each row.
  - `title`: Table title.
  - `addNewItem`: Callback for adding new items.

### `DataTableActionPopover.tsx`
A popover menu providing quick access to row-level actions within `DataTable`.

## Usage
To integrate these components into your project, import the necessary modules and provide the required props:
```tsx
import { BaseCard } from '@/components/base/BaseCardSystem/BaseCard';

<BaseCard
  item={{ id: 1, name: 'Example Item' }}
  renderContent={(item) => <p>{item.name}</p>}
  title="Sample Card"
  actions={[{ label: 'Edit', action: () => console.log('Edit clicked') }]}
/>
```

## Conclusion
The `base/` component system provides a highly modular and reusable set of UI components designed for scalability. Each component follows a structured approach, making it easy to extend and customize based on application needs.

