import type { PageLoad } from './$types';

// The `load` function receives arguments, including `url` and `fetch`.
export const load: PageLoad = async ({ fetch, url }) => {
	// 1. Get filter parameters from the URL's query string.
	const page = parseInt(url.searchParams.get('page') || '1');
	const search = url.searchParams.get('search') || '';
	const category = url.searchParams.get('category') || 'all';
	const perPage = 10;

	try {
		// 2. Fetch the complete, unfiltered list of products from the API.
		const res = await fetch('https://fakestoreapi.com/products');
		if (!res.ok) throw new Error(`API Error: ${res.statusText}`);

		let allProducts: any[] = await res.json();
        
        // --- 3. Perform filtering and pagination on the server-side ---

		// Filter by category
		let filteredProducts = allProducts;
		if (category !== 'all') {
			filteredProducts = filteredProducts.filter((p) => p.category === category);
		}

		// Filter by search term
		if (search) {
			filteredProducts = filteredProducts.filter((p) =>
				(p.title || '').toLowerCase().includes(search.toLowerCase())
			);
		}
        
        const total = filteredProducts.length;
        const totalPages = Math.ceil(total / perPage);

		// Paginate the final, filtered list
		const start = (page - 1) * perPage;
		const paginatedProducts = filteredProducts.slice(start, start + perPage);

		// 4. Return the pre-filtered, pre-paginated data to the component.
		return {
			products: paginatedProducts,
			total,
            totalPages,
            currentPage: page,
			// Also return the current filter values so the UI can be in sync.
			searchTerm: search,
			currentCategory: category
		};
	} catch (err: any) {
		return {
			products: [],
			total: 0,
            totalPages: 1,
            currentPage: 1,
			error: err.message,
		};
	}
};