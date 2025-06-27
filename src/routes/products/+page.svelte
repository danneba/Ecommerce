<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import ProductGrid from '../../components/ProductGrid.svelte';
	import Pagination from '../../components/Pagination.svelte';
	import Loader from '../../components/Loader.svelte';
	// @ts-ignore
	import { queueStatus, addToCart } from '$lib/providers/CartProvider.svelte';

	// --- Props & Local UI State ---
	let { data } = $props();

	// This is ONLY for the input field. The actual filtering happens in `+page.ts`.
	let localSearchTerm = $state(data.searchTerm || '');

	// --- Debounce Effect ---
	$effect(() => {
		if (!browser) return;
		if (localSearchTerm === data.searchTerm) return;
		const timer = setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			params.set('search', localSearchTerm);
			params.set('page', '1');
			goto(`?${params.toString()}`, { keepFocus: true, noScroll: true, replaceState: true });
		}, 300);
		return () => clearTimeout(timer);
	});

	// Helper function for category changes (no debounce needed here).
	function onCategoryChange(event: Event) {
		const newCategory = (event.currentTarget as HTMLSelectElement).value;
		const params = new URLSearchParams(window.location.search);
		params.set('category', newCategory);
		params.set('page', '1');
		goto(`?${params.toString()}`, { keepFocus: true, noScroll: true, replaceState: true });
	}
</script>

{#if data.error}
	<div class="text-center py-10 text-red-600">
		<h2 class="text-xl font-semibold">An error occurred</h2>
		<p>{data.error}</p>
	</div>
{:else}
	<div class="max-w-6xl mx-auto py-10 px-4">
		<h1 class="text-3xl font-bold mb-2">Products</h1>
		<p class="mb-6 text-gray-600">Discover our collection of amazing products</p>
		<div class="flex flex-col sm:flex-row-reverse gap-4 mb-8 items-center">
			<select
				onchange={onCategoryChange}
				aria-label="Filter products by category"
				class="w-full sm:w-56 px-4 py-2 rounded-lg border border-gray-300 bg-white"
			>
				<option value="all" selected={data.currentCategory === 'all'}>All Categories</option>
				<option value="electronics" selected={data.currentCategory === 'electronics'}>Electronics</option>
				<option value="jewelery" selected={data.currentCategory === 'jewelery'}>Jewelery</option>
				<option value="men's clothing" selected={data.currentCategory === "men's clothing"}>Men's Clothing</option>
				<option value="women's clothing" selected={data.currentCategory === "women's clothing"}>Women's Clothing</option>
			</select>
			<input
				type="text"
				class="flex-1 w-full px-4 py-2 rounded-lg border border-gray-300"
				placeholder="Search products..."
				bind:value={localSearchTerm}
				aria-label="Search products by title"
			/>
		</div>
		{#if typeof data.products === 'undefined' || data.products === null}
			<Loader />
		{:else if data.products.length > 0}
			<p class="mb-4 text-gray-500">
				Showing {data.products.length} of {data.total} products
			</p>
			<ProductGrid products={data.products} addToCart={addToCart} queueStatus={queueStatus} />
			<Pagination
				currentPage={data.currentPage}
				totalPages={data.totalPages}
				setPage={(p: number) => goto(`?search=${data.searchTerm || ''}&page=${p}&category=${data.currentCategory || 'all'}`, { keepFocus: true, noScroll: true, replaceState: true })}
			/>
		{:else}
			<div class="text-center text-gray-500 py-10">No products found for "{data.searchTerm}".</div>
		{/if}
	</div>
{/if}