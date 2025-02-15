# Project Management Dashboard

A modern, responsive project management dashboard built with Next.js 14, React, TypeScript, and Tailwind CSS. This application provides a comprehensive system for managing projects, objectives, and tasks with a focus on reusability and component-based architecture.

## Features

### Core Functionality
- **Project Management**: Track projects with status (todo, in progress, completed), priority levels, progress tracking, and due dates
- **Objective Tracking**: Set and monitor objectives with similar tracking capabilities as projects
- **Task Management**: Simple task tracking with status updates and descriptions
- **Dashboard Overview**: Unified view of high-priority projects, in-progress objectives, and recent tasks

### Technical Features
- **Reusable Component Systems**
  - BaseCard System for card-based layouts with action popovers
  - BaseTable System for tabular data with built-in date handling
  - DataTable system for simpler table views
  - Unified date selection component
  
- **Modern Architecture**
  - Type-safe development with TypeScript
  - Client-side components with Next.js 14
  - Global state management using Zustand
  - PostgreSQL database with Prisma ORM
  - RESTful API endpoints

- **UI/UX**
  - Responsive design with Tailwind CSS
  - shadcn/ui component library integration
  - Interactive dialogs and popovers
  - Progress tracking visualizations
  - Status and priority indicators with color coding

## Technology Stack

### Frontend
- Next.js 14
- React (with client components)
- TypeScript
- Tailwind CSS
- Zustand for state management
- shadcn/ui Components
- Lucide React Icons

### Backend
- Next.js API Routes
- PostgreSQL
- Prisma ORM

## Architecture

### Component Structure
- **Base Systems**
  - BaseCardSystem: Card components with action popovers
  - BaseTableSystem: Table system with date handling and actions
  - DataTableControlGroup: Simplified table components

- **Feature Components**
  - Project Components (Cards & Tables)
  - Objective Components (Cards & Tables)
  - Task Components (Cards & Tables)

- **Dashboard Components**
  - DashboardLayout: Main layout component
  - DashboardStats: Overview statistics
  - DashboardProjects: High-priority projects section
  - DashboardObjectives: In-progress objectives section
  - DashboardTasks: Recent tasks section

### Data Models

#### Project & Objective
- id: String (cuid)
- title: String
- description: String
- status: Enum (todo, in_progress, completed)
- priority: Enum (low, medium, high, critical)
- progress: Integer
- dueDate: DateTime (optional)
- createdAt: DateTime
- updatedAt: DateTime

#### Task
- id: String (cuid)
- title: String
- description: String
- status: Enum (todo, in_progress, completed)
- createdAt: DateTime
- updatedAt: DateTime

### State Management
- Separate Zustand stores for projects, objectives, and tasks
- CRUD operations with loading states and error handling
- Automatic refetching after updates

## Project Structure
```
├── app/
│   ├── api/              # API routes for CRUD operations
│   │   ├── objectives/
│   │   ├── projects/
│   │   └── tasks/
├── components/
│   ├── BaseCardSystem/   # Reusable card components
│   ├── BaseTableSystem/  # Table components with date handling
│   ├── DataTableControlGroup/  # Simplified tables
│   ├── ObjectiveCards/   # Objective-specific cards
│   ├── ProjectCards/     # Project-specific cards
│   ├── TaskCards/        # Task-specific cards
│   ├── dashboard/        # Dashboard components
│   └── ui/              # shadcn/ui components
├── prisma/              # Database schema and migrations
├── store/              # Zustand state management
└── types/              # TypeScript type definitions
```

## Getting Started

1. Clone the repository and install dependencies
```bash
git clone [repository-url]
cd [project-directory]
pnpm install
```

2. Set up the database
```bash
# Set up your PostgreSQL database
# Update .env with your database connection string
pnpm prisma migrate dev
```

3. Run the development server
```bash
pnpm dev
```

## Future Enhancements

- [ ] Authentication and authorization
- [ ] Advanced filtering and search
- [ ] Project/Objective relationships
- [ ] File attachments
- [ ] Team member assignments
- [ ] Activity logs and notifications
- [ ] Resource allocation tracking
- [ ] Extended date handling (start dates, deadlines)

## License

This project is licensed under the MIT License.