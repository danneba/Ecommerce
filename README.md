# EcoStore – Svelte 5 E-Commerce App

A modern, modular, and idiomatic Svelte 5 e-commerce application featuring real-time product search, smart cart management, rate-limited checkout, and a clean, scalable architecture.

## Features

- **Homepage**: Welcome and navigation to products and checkout.
- **Products Page**:
  - Real-time, SSR-safe debounced search
  - Category filtering
  - Pagination (modular component)
  - Loader for async states
  - Product grid and product card components
  - Add to cart with queue feedback
- **Cart & Checkout**:
  - Unified checkout page (no separate cart route)
  - Optimistic UI for quantity changes and removal
  - Rate-limited checkout (1 per 10 seconds, with countdown)
  - Success messaging and empty cart state
  - Rate limit notice component
- **Global State**: Managed with Svelte 5 runes and idiomatic getter/setter patterns
- **Accessibility**: ARIA labels, keyboard navigation, and accessible feedback
- **Clean Folder Structure**: Components, services, and providers are modular and separated

## Tech Stack
- [Svelte 5](https://svelte.dev/blog/svelte-5-beta)
- [SvelteKit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173)

3. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## Project Structure

- `src/components/` – UI components (ProductCard, ProductGrid, Pagination, Loader, RateLimitNotice)
- `src/lib/services/` – Business logic and runes (cartService)
- `src/lib/providers/` – Global state providers (CartProvider)
- `src/routes/` – SvelteKit routes (homepage, products, checkout)

## Customization
- Update API endpoints in `src/routes/products/+page.ts` as needed.
- Adjust rate limiting logic in `src/lib/services/cartService.svelte.ts`.
- Style with Tailwind or extend components as desired.

## License

MIT
