# Creatzy Project Development Guide

## Project Overview
Creatzy is a premium dark UI recruitment platform built with Next.js 14, TypeScript, and Tailwind CSS. Currently in the frontend UI phase with focus on visual design and reusable component architecture.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **State Management**: TBD (for future phases)
- **Database**: TBD (for future phases)

## Project Structure

```
agency/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable React components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Logo.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── NetworkCanvas.tsx
│   │   └── index.ts
│   └── lib/                 # Utilities and helpers (to be added)
├── public/                  # Static assets (to be added)
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Key Design System

### Colors
- Primary Orange: `#ff5a1f` (brand-orange)
- Dark Background: `#0a0a0a` (brand-dark)
- Grays: Use Tailwind's default gray scale

### Typography
- **Sans-serif**: Inter (weights: 400, 500, 700, 800)
- **Serif**: Playfair Display (for italic accents)
- Font sizes follow Tailwind's scale with custom 9xl

### Component Guidelines
- Keep components small and single-responsibility
- Always export from `src/components/index.ts`
- Use TypeScript interfaces for props
- Include prop validation and defaults
- Implement smooth transitions with transition-smooth utility

### Responsive Design
```
Mobile: base
Tablet: md: 768px
Desktop: lg: 1024px
XL: xl: 1280px
```

## Development Workflow

### Creating New Components
1. Create component file in `src/components/`
2. Use TypeScript with interface for props
3. Add exports to `src/components/index.ts`
4. Use Tailwind classes for styling
5. Add comments for complex logic

### Adding New Pages
1. Create folder structure in `src/app/`
2. Add `page.tsx` in the route folder
3. Follow Next.js file-based routing

### Modifying Styles
- Use Tailwind utilities first
- Add custom utilities in `src/app/globals.css`
- Update `tailwind.config.ts` for theme extensions
- Avoid inline styles

## Current Phase Focus
- Frontend UI structure and visual direction
- Reusable component architecture
- Design system implementation
- Performance optimization
- Accessibility basics

## Future Phases
- Backend API integration
- Authentication system
- Database schema
- Advanced features (job matching, notifications, etc.)
- Testing suite
- Performance monitoring

## Component Development Best Practices

### Example Component Template
```typescript
import React from "react";

interface YourComponentProps {
  prop1: string;
  prop2?: boolean;
  children?: React.ReactNode;
}

export const YourComponent: React.FC<YourComponentProps> = ({
  prop1,
  prop2 = false,
  children,
}) => {
  return (
    <div className="your-classes">
      {children}
    </div>
  );
};
```

### Client Components
Use `"use client"` directive at the top of components that require client-side interactivity (events, hooks, etc.)

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## Performance Considerations
- All animations use CSS transforms and GPU acceleration
- Canvas animation is optimized with requestAnimationFrame
- Images use Next.js Image component (when needed)
- Lazy loading for non-critical components
- Code splitting handled by Next.js automatically

## Accessibility Guidelines
- Use semantic HTML elements
- Ensure sufficient color contrast
- Provide alt text for images
- Use proper heading hierarchy
- Test keyboard navigation

## Notes for Future Development
- Current design uses fixed zIndex values - maintain consistency
- Particle animation runs on canvas - optimize if adding more animations
- Consider adding theme switcher functionality when needed
- Plan for dark/light mode toggle (currently dark mode only)
- Prepare for internationalization (i18n) setup
