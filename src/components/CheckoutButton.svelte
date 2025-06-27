<script lang="ts">
  let { disabled = false, onClick } = $props();
</script>
<button
  class="px-6 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 transition"
  disabled={disabled}
  onclick={onClick}
  aria-label="Go to checkout"
>
  <slot />
</button> 