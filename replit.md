# Skill Swap Platform

## Overview

This is a full-stack web application built with React and Express that allows users to swap skills with each other. The platform enables users to create profiles showcasing their skills, browse other users' profiles, and make skill exchange requests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI components wrapped in custom shadcn/ui components
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Simple in-memory storage (currently using MemStorage class)
- **API Style**: RESTful API with JSON responses

### Development Setup
- **Dev Server**: Vite dev server with HMR (Hot Module Replacement)
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Type Checking**: TypeScript with strict mode enabled
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)

## Key Components

### Database Schema
- **Users Table**: Stores user profiles with skills offered/wanted, location, ratings
- **Swap Requests Table**: Manages skill exchange requests between users
- **Relationships**: Foreign key relationships between users and swap requests

### Authentication System
- Basic email/password authentication
- User registration and login endpoints
- Session management (currently simplified, needs proper session handling)
- Local storage for client-side user state persistence

### API Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- Additional endpoints for user management and swap requests (in development)

### UI Components
- Comprehensive set of reusable UI components from shadcn/ui
- Custom styling with dark theme support
- Responsive design with mobile-first approach
- Accessible components using Radix UI primitives

## Data Flow

1. **User Registration/Login**: Users authenticate through the auth API endpoints
2. **Profile Management**: Users can create and update their skill profiles
3. **Skill Discovery**: Users browse other users' profiles to find skill matches
4. **Swap Requests**: Users can initiate skill exchange requests
5. **Request Management**: Users can accept/reject incoming swap requests

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit integration

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations handle schema changes

### Environment Requirements
- Node.js runtime with ES modules support
- PostgreSQL database (configured via DATABASE_URL)
- Environment variables for database connection

### Scripts
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Push database schema changes

### Current Limitations
- Authentication system needs proper session management
- No production-ready session storage
- Database connection relies on environment configuration
- Limited error handling and logging in production