# Dubai City Bot - Admin Panel

## Overview

This is a comprehensive admin panel for managing a Dubai City Bot Telegram application. The system is built using a modern full-stack architecture with React frontend, Express.js backend, and PostgreSQL database with Drizzle ORM. The application provides extensive management capabilities for users, game assets, economy, and community features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **API Structure**: RESTful API with `/api` prefix

### Development Setup
- **Monorepo Structure**: Shared types and schemas between client and server
- **Hot Reloading**: Vite middleware integration for development
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)

## Key Components

### Admin Panel Modules
1. **Dashboard**: Overview statistics and recent activities
2. **Users Management**: User profiles, status, coins, levels, and actions
3. **Empire Management**: Level system with 14 tiers from beginner to Dubai King
4. **Skins Management**: Game appearance items with rarity and pricing
5. **Tasks Management**: Social media tasks and rewards system
6. **Prices & Rewards**: Configurable pricing for all game elements
7. **Notifications**: Bulk messaging system for users
8. **Market Management**: Business assets (cafes, restaurants, offices, factories)
9. **Assets Management**: Promo codes and YouTube tasks
10. **Projects**: Daily missions and special events
11. **Team Management**: Company/group management with chat features
12. **Profile Management**: Bot configuration and announcements
13. **Reports**: Analytics and data export functionality
14. **Statistics**: User metrics, revenue tracking, and geographic data
15. **Settings**: System configuration and localization

### Game Economy Features
- **Currency System**: Coin-based economy with various earning methods
- **Level Progression**: 14-tier empire system with themed names
- **Asset Ownership**: Businesses that generate hourly profits
- **Referral System**: User invitation rewards
- **Task Rewards**: Social media engagement incentives

## Data Flow

### User Management Flow
1. Users register through Telegram bot
2. Admin panel provides CRUD operations for user data
3. User statistics tracked for analytics and reports
4. Bulk actions available for user management

### Economy Management Flow
1. Admin configures prices and rewards through the panel
2. Users earn coins through tasks, purchases, and referrals
3. Users spend coins on skins, business assets, and upgrades
4. Revenue tracking and analytics provide business insights

### Content Management Flow
1. Admin creates tasks with social media links and rewards
2. Users complete tasks and receive automatic rewards
3. Promo codes provide additional earning opportunities
4. Notifications keep users engaged with new content

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@radix-ui/react-***: Accessible UI component primitives
- **@tanstack/react-query**: Server state management
- **class-variance-authority**: Type-safe styling variants
- **date-fns**: Date manipulation utilities

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **@replit/vite-plugin-***: Replit-specific development tools

### Database Schema
- **Users Table**: Core user information with username, password, and profile data
- **Extensible Schema**: Designed to accommodate additional tables for game features

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations handle schema updates

### Environment Configuration
- **Development**: tsx for hot reloading with Vite middleware
- **Production**: Node.js serves built assets and API routes
- **Database**: Environment variable `DATABASE_URL` for connection

### Deployment Commands
- `npm run dev`: Development server with hot reloading
- `npm run build`: Production build for both frontend and backend
- `npm run start`: Production server
- `npm run db:push`: Apply database schema changes

### Infrastructure Requirements
- Node.js runtime environment
- PostgreSQL database (Neon Database recommended)
- Static file serving capability
- Environment variable support for configuration

The application is designed to be deployed on platforms like Replit, Vercel, or similar Node.js hosting services with PostgreSQL database support.