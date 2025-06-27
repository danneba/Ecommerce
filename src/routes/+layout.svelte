<script lang="ts">
    let { children } = $props();
    import "../app.css";
    import { page } from '$app/stores';
    const navLinks = [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' }
    ];
    // @ts-ignore
    import { cart } from '$lib/providers/CartProvider.svelte';
</script>

<nav class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
  <div class="flex items-center gap-2">
    <span class="text-2xl"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v8.25A2.25 2.25 0 006.75 20.25h2.25m9-10.5v8.25a2.25 2.25 0 01-2.25 2.25h-2.25m-4.5 0h4.5" /></svg></span>
    <span class="font-bold text-xl tracking-tight">EcoStore</span>
  </div>
  <div class="flex gap-2 items-center">
    {#each navLinks as link}
      <a
        href={link.href}
        class="px-4 py-2 rounded-lg font-medium flex items-center gap-1 transition-colors duration-150"
        class:bg-blue-100={$page.url.pathname === link.href}
        class:text-blue-600={$page.url.pathname === link.href}
        class:text-gray-700={$page.url.pathname !== link.href}
      >
        {link.name}
      </a>
    {/each}
    <a
      href="/checkout"
      class="relative px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors duration-150 hover:bg-blue-200"
      class:bg-blue-100={$page.url.pathname === '/checkout'}
      class:text-blue-600={$page.url.pathname === '/checkout'}
      class:text-gray-700={$page.url.pathname !== '/checkout'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75l1.5 16.5A2.25 2.25 0 005.988 22.5h12.024a2.25 2.25 0 002.238-2.25l1.5-16.5M6.75 6.75V5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25v1.5" /></svg>
      <span>Checkout</span>
      {#if Array.isArray(cart) && cart.length > 0}
        <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{cart.length}</span>
      {/if}
    </a>
  </div>
</nav>
<main class="min-h-screen bg-gray-50">
  <slot />
</main>