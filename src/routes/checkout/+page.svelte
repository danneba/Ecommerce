<script lang="ts">
    // @ts-ignore
    import { cart, removeFromCart, updateQuantity } from '$lib/providers/CartProvider.svelte';
    import { getCartRateLimitEnd, setCartRateLimitEnd } from "$lib/services/cartService.svelte";
    import Loader from '../../components/Loader.svelte';
    import RateLimitNotice from '../../components/RateLimitNotice.svelte';
  
    let isProcessing = $state(false);
    let showSuccess = $state(false);
    let countdown = $state(0);
    let timer: ReturnType<typeof setInterval> | undefined;
  
    $effect(() => {
      clearInterval(timer);
      function updateCountdown() {
        const end = getCartRateLimitEnd();
        const now = Date.now();
        if (end > now) {
          countdown = Math.ceil((end - now) / 1000);
        } else {
          countdown = 0;
          clearInterval(timer);
        }
      }
      updateCountdown();
      if (getCartRateLimitEnd() > Date.now()) {
        timer = setInterval(updateCountdown, 1000);
      }
      return () => clearInterval(timer);
    });
  
    const isButtonDisabled = $derived(() => isProcessing || countdown > 0);
    const buttonText = $derived(() => {
      if (isProcessing) return "Processing...";
      if (countdown > 0) return `Please wait ${countdown}s`;
      return "Checkout";
    });
  
    function getSubtotal(): number {
      return Array.isArray(cart) ? cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) : 0;
    }
    function getTax(): number {
      return +(getSubtotal() * 0.1).toFixed(2); // 10% tax
    }
    function getTotal(): number {
      return +(getSubtotal() + getTax()).toFixed(2);
    }
  
    function handleRemove(id: number) {
      removeFromCart(id); // Optimistic UI
    }
  
    async function handleCheckout() {
      if (isProcessing || countdown > 0) return;
      isProcessing = true;
      await new Promise((res) => setTimeout(res, 1000));
      cart.length = 0; // Clear the cart
      setCartRateLimitEnd(Date.now() + 10000);
      isProcessing = false;
      showSuccess = true;
      setTimeout(() => (showSuccess = false), 5000);
    }
  </script>
  
  <div class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Shopping Cart</h1>
    {#if showSuccess}
      <div class="flex justify-center items-center min-h-[20vh]">
        <div class="bg-white rounded-xl shadow p-10 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-green-500 mb-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <h2 class="text-2xl font-bold text-green-600 mb-2">Checkout Successful!</h2>
          <p class="mb-6 text-gray-600">Thank you for your purchase. Your order has been processed.</p>
          <a href="/products" class="px-6 py-3 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-800 transition">Continue Shopping</a>
        </div>
      </div>
    {:else if Array.isArray(cart) && cart.length === 0}
      <div class="flex justify-center items-center min-h-[40vh]">
        <div class="bg-white rounded-xl shadow p-10 flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-gray-300 mb-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75l1.5 16.5A2.25 2.25 0 005.988 22.5h12.024a2.25 2.25 0 002.238-2.25l1.5-16.5M6.75 6.75V5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25v1.5" /></svg>
          <h2 class="text-xl font-bold mb-2">Your cart is empty</h2>
          <p class="text-gray-500 mb-6">Add some products to your cart to get started</p>
          <a href="/products" class="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">Continue Shopping</a>
        </div>
      </div>
    {/if}
    {#if Array.isArray(cart) && cart.length > 0}
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex-1">
          {#each cart as item}
            <div class="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
              <img src={item.image} alt={item.title} class="w-20 h-20 object-contain rounded" />
              <div class="flex-1">
                <div class="font-semibold text-lg">{item.title}</div>
                <div class="text-xs text-gray-400 mb-1">{item.category}</div>
                <div class="text-gray-600 flex items-center gap-2">
                  <button
                    class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold disabled:opacity-50"
                    disabled={item.quantity === 1}
                    onclick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >-</button>
                  <span class="mx-2 w-8 text-center">{item.quantity}</span>
                  <button
                    class="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                    onclick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                  <span class="ml-2">x ${item.price}</span>
                </div>
              </div>
              <button class="ml-4 text-red-500 hover:text-red-700" onclick={() => handleRemove(item.id)} title="Remove">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          {/each}
        </div>
        <div class="w-full md:w-80 bg-white rounded-xl shadow p-6 h-fit">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <div class="flex justify-between mb-2"><span>Subtotal</span><span>${getSubtotal().toFixed(2)}</span></div>
          <div class="flex justify-between mb-2"><span>Tax (10%)</span><span>${getTax().toFixed(2)}</span></div>
          <div class="flex justify-between mb-4 font-bold text-lg"><span>Total</span><span>${getTotal().toFixed(2)}</span></div>
          <button
            class="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
            disabled={isProcessing || countdown > 0}
            onclick={handleCheckout}
          >
            {isProcessing ? 'Processing...' : countdown > 0 ? `Please wait ${countdown}s` : 'Checkout'}
          </button>
          <RateLimitNotice secondsLeft={countdown} />
        </div>
      </div>
    {/if}
    {#if !Array.isArray(cart)}
      <Loader />
    {/if}
  </div>