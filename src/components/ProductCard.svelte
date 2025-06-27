<script lang="ts">
  let { product, addToCart, queueStatus } = $props();
</script>
<div class="bg-white rounded-xl shadow p-4 flex flex-col">
  <img src={product.image} alt={product.title} class="h-40 w-full object-contain mb-4" />
  <div class="flex-grow">
    <span class="inline-block bg-gray-200 text-xs px-2 py-1 rounded mb-2">{product.category}</span>
    <h2 class="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h2>
  </div>
  <div class="font-bold text-xl mt-2 mb-3">${product.price.toFixed(2)}</div>
  <button
    class="mt-auto w-full px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
    aria-label={`Add ${product.title} to cart`}
    disabled={queueStatus && (queueStatus[product.id] === 'adding' || queueStatus[product.id] === 'added')}
    onclick={() => addToCart(product)}
  >
    {#if queueStatus && queueStatus[product.id] === 'adding'}
      Adding...
    {:else if queueStatus && queueStatus[product.id] === 'added'}
      Added!
    {:else}
      + Add to Cart
    {/if}
  </button>
</div> 