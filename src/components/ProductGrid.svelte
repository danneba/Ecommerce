<script lang="ts">
  import ProductCard from './ProductCard.svelte';
  let { products = [], addToCart, queueStatus } = $props();
</script>
{#if products.length > 0}
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each products as product (product.id)}
      <ProductCard {product} {addToCart} {queueStatus} />
    {/each}
  </div>
{:else}
  <div class="text-center text-gray-500 py-10">No products found for the selected criteria.</div>
{/if} 