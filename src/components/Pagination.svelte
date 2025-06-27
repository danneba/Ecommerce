<script lang="ts">
  let { currentPage = 1, totalPages = 1, setPage } = $props();
</script>
<div class="flex justify-center gap-2 mt-8">
  <button
    class="px-3 py-2 rounded border font-medium transition flex items-center"
    onclick={() => setPage(currentPage - 1)}
    disabled={currentPage === 1}
    aria-label="Previous page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
  </button>
  {#each Array.from({ length: totalPages }, (_, i) => i + 1) as p}
    <button
      class="px-4 py-2 rounded border font-medium transition"
      class:bg-blue-600={p === currentPage}
      class:text-white={p === currentPage}
      class:bg-white={p !== currentPage}
      onclick={() => setPage(p)}
      aria-current={p === currentPage ? 'page' : undefined}
    >{p}</button>
  {/each}
  <button
    class="px-3 py-2 rounded border font-medium transition flex items-center"
    onclick={() => setPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    aria-label="Next page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
  </button>
</div> 