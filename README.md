# FleetLink - Logistics Vehicle Booking System

A modern, responsive web application for managing and booking logistics vehicles in a B2B environment. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo
[View Live on Vercel](https://plena-token-portfolio.vercel.app/) 

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Responsive Design](#responsive-design)
- [Form Validation](#form-validation)
- [Error Handling](#error-handling)


## Overview

FleetLink is a comprehensive logistics vehicle booking platform designed for B2B clients. The system allows administrators and users to:

- **Add vehicles** to the fleet with specifications
- **Search for available vehicles** based on capacity, route, and timing
- **Book vehicles** instantly with real-time availability checking
- **Manage bookings** (coming soon)

The application features a modern, responsive design that works seamlessly across desktop, tablet, and mobile devices.

## Features    

### Core Functionality
- ✅ **Vehicle Management**: Add new vehicles with capacity and specifications
- ✅ **Smart Search**: Find available vehicles based on multiple criteria
- ✅ **Responsive Design**: Mobile-first approach with seamless cross-device experience
- ✅ **Form Validation**: Comprehensive client-side validation with user-friendly error messages
- ✅ **Error Handling**: Robust error handling with toast notifications
- ✅ **Loading States**: Visual feedback during API operations

## Screenshots
![Desktop Image 1](/public/screenshots/image1.png)
![Desktop Image 2](/public/screenshots/image2.png)
![Desktop Image 3](/public/screenshots/image3.png)
![Desktop Image 4](/public/screenshots/image4.png)
![Desktop Image 5](/public/screenshots/image5.png)

![Mobile Image 6](/public/screenshots/image6.png)
![Mobile Image 7](/public/screenshots/image7.png)
![Mobile Image 8](/public/screenshots/image8.png)

## Tech Stack
### Technical Features
- 🎨 **Tailwind CSS**: Utility-first styling with responsive design
- 📱 **Mobile-First**: Optimized for mobile devices with progressive enhancement
- 🔄 **Real-time Updates**: Dynamic UI updates based on API responses
- 🛡️ **Input Validation**: Zod schema validation with custom error messages

### Frontend
- **React 19** - Latest React with modern hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Axios** - HTTP client for API calls
- **Sonner** - Toast notifications

### UI Components
- **Shadcn/ui** - Modern, accessible component library
- **Lucide React** - Beautiful icons
- **Custom Components** - Tailored for FleetLink's needs

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## Project Structure

```
src/
├── components/
│   ├── ui/                # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── sonner.tsx
│   │   └── spinner.tsx
│   └── layout/
│       └── Layout.tsx     # Main layout component
├── pages/
│   ├── Dashboard.tsx      # Home dashboard
│   ├── AddVehicle.tsx     # Add new vehicle form
│   ├── SearchBook.tsx     # Search and book vehicles
│   └── Bookings.tsx       # Bookings management (coming soon)
├── services/
│   └── api.ts             # API service layer
├── types/
│   └── index.d.ts         # TypeScript type definitions
├── lib/
│   └── utils.ts           # Utility functions
├── assets/
│   └── logo.png           # FleetLink logo
├── App.tsx                # Main app component
└── main.tsx               # Application entry point
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnsariYasirArfat/fleetlink_client
   cd fleetlink_client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   echo "VITE_API_BASE_URL=http://localhost:3000" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Usage

### Dashboard
- **Overview**: Quick access to all main features
- **Statistics**: System overview with vehicle counts
- **Recent Activity**: Latest system activities
- **Quick Actions**: Direct links to key features

### Add Vehicle
1. Navigate to "Add Vehicle" from the dashboard
2. Fill in vehicle details:
   - **Vehicle Name**: Unique identifier (e.g., Truck-001)
   - **Capacity**: Maximum weight in KG (1-50,000)
   - **Tyres**: Number of tyres (4-32)
3. Click "Add Vehicle" to submit
4. Form resets automatically on success

### Search & Book Vehicles
1. Go to "Search & Book" from the dashboard
2. Enter search criteria:
   - **Capacity Required**: Minimum capacity needed
   - **From/To Pincode**: 6-digit pincodes
   - **Start Time**: Desired booking time
3. Click "Search Availability"
4. Review available vehicles
5. Click "Book Now" on desired vehicle
6. Booking confirmation appears

### Bookings (Coming Soon)
- View all your bookings
- Track booking status
- Cancel bookings when needed

## API Integration

### Backend Endpoints

The frontend integrates with the following backend APIs:

#### Vehicle Management
- `POST /api/vehicles` - Add new vehicle
- `GET /api/vehicles/available` - Search available vehicles

#### Booking Management
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Cancel booking (coming soon)
- `GET /api/bookings/user/:customerId` - Get user bookings (coming soon)

### API Configuration

Update the API base URL in your environment:
```env
VITE_API_BASE_URL=http://your-backend-url:port
```

### Error Handling

The application includes comprehensive error handling:
- **Network errors**: Connection issues
- **Validation errors**: Invalid input data
- **Business logic errors**: Vehicle conflicts, not found
- **User feedback**: Toast notifications for all error types

##  Responsive Design

### Mobile Features
- **Collapsible navigation** with hamburger menu
- **Touch-friendly** buttons and inputs
- **Optimized layouts** for small screens
- **Progressive enhancement** for larger screens

### Key Responsive Components
- **Navigation**: Sticky header with mobile menu
- **Forms**: Stack on mobile, side-by-side on desktop
- **Cards**: Responsive grid layouts
- **Typography**: Scalable text sizes

## Form Validation

### Validation Features
- **Real-time validation** on form input
- **User-friendly error messages**
- **Type coercion** for number inputs
- **Custom validation rules** for business logic

## Error Handling

### Error Types
1. **Network Errors**: Connection failures, timeouts
2. **Validation Errors**: Invalid form data
3. **Business Logic Errors**: Vehicle conflicts, not found
4. **Server Errors**: Backend issues

### Error Display
- **Toast notifications** for immediate feedback
- **Inline form errors** for validation issues
- **Loading states** during API calls
- **Fallback messages** for unknown errors

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and best practices
- **Prettier**: Consistent code formatting
- **Component structure**: Reusable, maintainable components



### Environment Variables
```env
VITE_API_BASE_URL=https://your-api-domain.com
```

### Ansari Yaseer Arfat
- [Resume](https://drive.google.com/file/d/1BQsv5BPnOruKEPNQrLbV21srXyED1lZq/view)
- [Github Account](https://github.com/AnsariYasirArfat)
- [LinkedIn Profile](https://www.linkedin.com/in/yaseeransari)

---

