<script context="module" lang="ts">
    type CartItem = {
      id: number;
      title: string;
      price: number;
      image: string;
      quantity: number;
      category?: string;
    };
  
    // Shared state using Svelte 5 runes
    export const cart = $state<CartItem[]>([]);
    export const queueStatus = $state<Record<number, 'idle' | 'adding' | 'added'>>({});
  
    export function addToCart(product: { id: number; title: string; price: number; image: string; category?: string }) {
      if (queueStatus[product.id] === 'adding') return;
      queueStatus[product.id] = 'adding';
      setTimeout(() => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        queueStatus[product.id] = 'added';
        setTimeout(() => {
          queueStatus[product.id] = 'idle';
        }, 1000);
      }, 500);
    }

    export function removeFromCart(id: number) {
      const idx = cart.findIndex(item => item.id === id);
      if (idx > -1) cart.splice(idx, 1);
    }

    export function updateQuantity(id: number, qty: number) {
      const idx = cart.findIndex(item => item.id === id);
      if (idx > -1 && qty > 0) {
        cart[idx].quantity = qty;
      }
    }
  </script>