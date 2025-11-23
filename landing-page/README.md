# Orphelix Landing Page

Modern, responsive landing page for Orphelix Kubernetes Dashboard built with Next.js 15, React 19, and Material-UI.

## Features

- 🎨 **Liquid Glass Design** - Beautiful glassmorphism UI with animated gradients
- 📱 **Mobile Responsive** - Optimized for all screen sizes
- ⚡ **Fast Performance** - Next.js 15 with TypeScript
- 🎭 **Smooth Animations** - CSS animations for enhanced UX
- 🌙 **Dark Theme** - Professional dark mode design

## Structure

```
landing-page/
├── app/
│   ├── layout.tsx       # Root layout with MUI theme
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles and animations
├── components/
│   ├── hero.tsx         # Hero section with CTAs
│   ├── features.tsx     # Features grid
│   ├── screenshot.tsx   # Screenshot section with placeholder
│   ├── why-orphelix.tsx # Why choose section
│   ├── cta-section.tsx  # Final CTA
│   └── footer.tsx       # Footer with links
└── public/
    └── screenshots/     # Place your screenshots here
```

## Getting Started

### Install Dependencies

```bash
cd landing-page
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Adding Screenshots

1. Place your screenshots in `/public/screenshots/`
2. Update the `screenshot.tsx` component to use your images:

```tsx
<Box
  component="img"
  src="/screenshots/dashboard.png"
  alt="Orphelix Dashboard"
  sx={{
    width: '100%',
    borderRadius: 3,
  }}
/>
```

## Customization

### Update Links

Update the following links in components:

- **Demo URL**: `http://localhost:3000` → your demo URL
- **GitHub URL**: `https://github.com/dmakowski-rasp/kubevista` → your repo
- **Documentation URL**: `#` → your docs URL

### Colors

Theme colors are defined in `app/layout.tsx`:

```typescript
const darkTheme = createTheme({
  palette: {
    primary: { main: '#3b82f6' },  // Blue
    secondary: { main: '#8b5cf6' }, // Purple
  },
})
```

### Content

Update content in component files:
- **Hero tagline**: `components/hero.tsx`
- **Features list**: `components/features.tsx`
- **Why choose**: `components/why-orphelix.tsx`
- **Footer links**: `components/footer.tsx`

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
npm run build
# Upload .next folder to Netlify
```

### Docker

```bash
docker build -t orphelix-landing .
docker run -p 3001:3001 orphelix-landing
```

## Technologies

- **Next.js 15** - React framework
- **React 19** - UI library
- **Material-UI 6** - Component library
- **TypeScript 5.7** - Type safety
- **Emotion** - CSS-in-JS

## License

Same as main project (Apache License 2.0)
