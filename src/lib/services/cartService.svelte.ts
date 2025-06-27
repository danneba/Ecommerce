// Cart Service using Svelte 5 runes (no stores) in a Svelte module file

// Cart item type
export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
};

let cart = $state<CartItem[]>([]);
let queueStatus = $state<Record<number, 'idle' | 'adding' | 'added'>>({});
let cartRateLimitEnd = $state(0);

// Add to cart with message queue simulation
export function addToCart(product: { id: number; title: string; price: number; image: string; category?: string }) {
  if (queueStatus[product.id] === 'adding') return; // Prevent duplicate
  queueStatus[product.id] = 'adding';
  setTimeout(() => {
    // Add or increment
    const idx = cart.findIndex(item => item.id === product.id);
    if (idx > -1) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    queueStatus[product.id] = 'added';
    setTimeout(() => {
      queueStatus[product.id] = 'idle';
    }, 1000); // Reset status after 1s
  }, 500);
}

// Remove from cart (mutate in place)
export function removeFromCart(id: number) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx > -1) cart.splice(idx, 1);
}

// Update quantity (mutate in place)
export function updateQuantity(id: number, qty: number) {
  const idx = cart.findIndex(item => item.id === id);
  if (idx > -1) {
    cart[idx].quantity = qty;
  }
}

// Optional: export a getter for cart
export function getCart() { return cart; }
export function setCart(val: CartItem[]) { cart = val; }

export function getQueueStatus() { return queueStatus; }
export function setQueueStatus(val: Record<number, 'idle' | 'adding' | 'added'>) { queueStatus = val; }

export function getCartRateLimitEnd() { return cartRateLimitEnd; }
export function setCartRateLimitEnd(val: number) { cartRateLimitEnd = val; } 