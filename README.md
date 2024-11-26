# Document OCR Viewer

A modern document OCR viewer built with Next.js, featuring field selection and document review capabilities.

## Overview

This project is built using [Next.js](https://nextjs.org), providing a robust foundation for a document OCR viewing and management system. It includes:

- Document viewing and field selection interface
- Dynamic document review workflow
- Custom font implementation using Geist and Geist Mono
- Modern component library with shadcn/ui
- Theme switching support (Light/Dark mode)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── src/
│   ├── app/                       # Next.js app router
│   │   ├── api/                  # API endpoints
│   │   │   ├── document/         # Document management APIs
│   │   │   └── documents/        # Document listing APIs
│   │   ├── document/             # Document viewer pages
│   │   └── fonts/               # Custom fonts
│   ├── data/                    # Static data
│   ├── components/               # React components
│   │   ├── alerts/              # Alert dialogs
│   │   ├── ui/                  # Shared UI components
│   │   ├── document-viewer.tsx  # Document viewing
│   │   ├── document-card.tsx     # Document card component
│   │   ├── field-badge.tsx        # Field badge component
│   │   ├── field-card.tsx         # Field card component
│   │   ├── field-selector.tsx   # Field selection
│   │   ├── header.tsx             # Header component
│   │   ├── status-icon.tsx        # Status icon component
│   │   └── theme-toggle.tsx     # Theme switching
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   └── types/                   # TypeScript definitions
```

## Features

- **Document Viewer**: Advanced document viewing interface with zoom controls
- **Field Selection**: Interactive field selection and validation
- **Theme Support**: Light and dark mode with system preference detection
- **Type Safety**: Comprehensive TypeScript implementation
- **Modern UI**: Responsive design using shadcn/ui components
- **API Integration**: RESTful API endpoints for document management

## Development

The application uses a modern React stack with:

- Next.js 15+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- shadcn/ui for components
- Radix UI primitives
- Axios for API requests

## API Routes

- `/api/documents` - List all documents
- `/api/document/[doc_id]` - Get document details
- `/api/document/[doc_id]/sections` - Get document sections

## Performance Analysis

Below are the Lighthouse analysis results for key pages of the application:

### Home Page
![Home Page Lighthouse Analysis](@home-page.png)

### Review Page
![Review Page Lighthouse Analysis](@review-page.png)

The application achieves strong performance metrics across both pages, with particular attention paid to:

- First Contentful Paint (FCP)
- Time to Interactive (TTI) 
- Cumulative Layout Shift (CLS)
- Search Engine Optimization (SEO)
- Accessibility compliance

Key optimizations implemented:
- Image optimization and lazy loading
- Component code splitting
- Server-side rendering where beneficial
- Responsive design practices
- ARIA attributes and semantic HTML


## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
