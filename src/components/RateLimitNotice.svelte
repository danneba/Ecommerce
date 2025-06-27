<script lang="ts">
  let { secondsLeft = 0 } = $props();
</script>
{#if secondsLeft > 0}
  <div class="text-red-600 text-sm mt-2" role="status" aria-live="polite">
    Please wait {secondsLeft} second{secondsLeft === 1 ? '' : 's'} before checking out again.
  </div>
{/if} 