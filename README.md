# Project Management Dashboard

A modern, responsive project management dashboard built with Next.js 14, React, TypeScript, and Tailwind CSS. This application provides a comprehensive system for managing projects, objectives, and tasks with a focus on reusability and maintainability.

## Features

### Core Functionality
- **Project Management**: Create, update, and track projects with priorities, progress, and due dates
- **Objective Tracking**: Set and monitor objectives with progress tracking and priority levels
- **Task Management**: Manage day-to-day tasks with status updates and descriptions
- **Dashboard Overview**: Get instant insights into active projects, objectives, and tasks

### Technical Features
- **Reusable Component Systems**
  - BaseCard System for card-based layouts
  - BaseTable System for tabular data presentation
  - Shared action management system
  - Unified date selection component
  
- **Modern Architecture**
  - Type-safe development with TypeScript
  - Server and client components with Next.js 14
  - Global state management using Zustand
  - PostgreSQL database with Prisma ORM
  - RESTful API endpoints

- **UI/UX**
  - Responsive design for all screen sizes
  - Modern UI components from shadcn/ui
  - Interactive dialogs and popovers
  - Progress tracking visualizations
  - Status and priority indicators

## Technology Stack

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- shadcn/ui Components
- Lucide Icons

### Backend
- Next.js API Routes
- PostgreSQL
- Prisma ORM

### Development Tools
- ESLint
- Prettier
- PostCSS
- TypeScript

## Architecture

### Component Structure
- **Base Systems**
  - BaseCardSystem: Reusable card components with actions
  - BaseTableSystem: Flexible table system with sorting and actions
  - DataTableControlGroup: Enhanced table controls

- **Feature Components**
  - Project Components (Cards & Tables)
  - Objective Components (Cards & Tables)
  - Task Components (Cards & Tables)

- **Dashboard Components**
  - DashboardLayout
  - DashboardStats
  - DashboardHeader
  - Feature-specific sections

### Data Flow
1. User interactions trigger store actions
2. Store updates are processed through API endpoints
3. Database changes are reflected back to the UI
4. Real-time updates maintain UI/database consistency

## Key Design Patterns

### Component Composition
- Higher-order components for shared functionality
- Render props for flexible content rendering
- Custom hooks for shared logic

### State Management
- Centralized stores for each entity type
- Async action handling with loading states
- Error boundary implementation
- Optimistic updates for better UX

### Type Safety
- Shared type definitions
- Generic components for type flexibility
- Strong typing for API responses
- Runtime type checking where necessary

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies
```bash
pnpm install
```

3. Set up the database
```bash
# Update .env with your database connection
pnpm prisma migrate dev
```

4. Run the development server
```bash
pnpm dev
```

## Project Structure
```
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   └── page.tsx     # Main dashboard page
├── components/       # React components
│   ├── BaseCardSystem/
│   ├── BaseTableSystem/
│   ├── DataTableControlGroup/
│   └── ui/          # Shared UI components
├── prisma/          # Database schema and migrations
├── store/           # Zustand stores
└── types/           # TypeScript types
```

## Future Enhancements

- [ ] Dark mode support
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Team collaboration features
- [ ] Timeline views
- [ ] Analytics dashboard
- [ ] Mobile app version
- [ ] Integration with external tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- shadcn/ui for the component library
- Vercel for Next.js
- Prisma team for the ORM
- TanStack team for table utilities