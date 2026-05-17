# Creatzy - Recruitment Reimagined

Premium dark UI agency website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Design Features

- **Modern Dark UI**: Premium minimal design with constellation background effects
- **Animated Network**: Canvas-based particle animation with connection lines
- **Responsive Layout**: Fully responsive design from mobile to desktop
- **Smooth Transitions**: Polished hover effects and transitions throughout
- **High Performance**: Optimized components with Next.js best practices
- **Pixel-Perfect**: Maintains design fidelity across all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with font configuration
│   ├── globals.css         # Global styles and utilities
│   └── page.tsx            # Home page
├── components/
│   ├── Button.tsx          # Reusable button component
│   ├── Badge.tsx           # Badge component
│   ├── Logo.tsx            # Logo component
│   ├── Header.tsx          # Main header/navigation
│   ├── HeroSection.tsx     # Hero section with headline
│   ├── NetworkCanvas.tsx   # Animated particle background
│   └── index.ts            # Component exports
```

## 🎯 Key Components

### Header
- Logo with branded styling
- Navigation links (hidden on mobile, visible on lg)
- Dark mode indicator
- Call-to-action button

### Hero Section
- Animated badge with pulse indicator
- Large responsive headline with italic accent
- Descriptive subtext
- Maximum width container for readability

### NetworkCanvas
- Client-side particle animation using Canvas API
- Dynamic particle generation and movement
- Distance-based connection lines
- Responsive to window resize

## 🎨 Design System

### Colors
- **Primary Orange**: `#ff5a1f` (brand-orange)
- **Dark Background**: `#0a0a0a` (brand-dark)

### Typography
- **Sans**: Inter (400, 500, 700, 800)
- **Serif**: Playfair Display (with italic)

### Spacing & Layout
- Uses Tailwind's default scale
- Max-width container for content (7xl)
- Responsive padding: 6px mobile → 12px tablet → 20px desktop

## 🔧 Customization

### Adding New Sections
1. Create a new component in `src/components/`
2. Export it from `src/components/index.ts`
3. Import and use in page or layout

### Modifying Colors
Edit `tailwind.config.ts` to update brand colors:
```typescript
colors: {
  "brand-orange": "#ff5a1f",
  "brand-dark": "#0a0a0a",
}
```

### Adjusting Typography
Update `tailwind.config.ts` fontFamily section or modify Google Fonts imports in `src/app/layout.tsx`

## 📱 Responsive Breakpoints

- **Mobile**: Base styles (< 640px)
- **Tablet**: md: 768px and above
- **Desktop**: lg: 1024px and above
- **XL**: xl: 1280px and above

## 🎬 Animation & Transitions

- Custom transition-smooth utility for consistent transitions (300ms ease-in-out)
- hover-scale utility for interactive elements (105% scale)
- Pulse animation on badge indicator
- Canvas-based particle movement and connections

## 📦 Dependencies

- **Next.js 14**: React framework
- **React 18**: UI library
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **TypeScript**: Type safety

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
vercel
```

### Other Platforms
The project is built to work on any platform that supports Node.js 18+. Build the project and serve the `.next` directory.

## 📝 Notes

- Frontend UI phase focused on visual design and layout
- Backend integration and functionality will be added in later stages
- All animations are GPU-accelerated for smooth performance
- Fully SEO-friendly with Next.js metadata API

## 📄 License

MIT
