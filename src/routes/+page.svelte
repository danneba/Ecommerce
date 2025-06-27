<script>
 
  // Simulate live user count
  let userCount = $state(Math.floor(1000 + Math.random() * 500));
  $effect(() => {
    const interval = setInterval(() => {
      userCount = Math.floor(1000 + Math.random() * 500);
    }, 5000);
    return () => clearInterval(interval);
  });
</script>

<section class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 py-20 text-center text-white relative overflow-hidden">
  <div class="max-w-2xl mx-auto z-10 relative">
    <h1 class="text-5xl font-bold mb-2">Welcome to <span class="text-yellow-400">EcoStore</span></h1>
    <p class="mb-6 text-lg">Discover amazing products with our advanced e-commerce platform featuring real-time search, smart cart management, and seamless checkout experience.</p>
    <div class="flex justify-center mb-6">
      <div class="bg-white/10 rounded-full px-6 py-2 flex items-center gap-2 text-green-300 font-semibold text-lg shadow">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5H6.75A2.25 2.25 0 014.5 20.25v-.75z" /></svg>
        <span class="text-green-200">{userCount} users online</span>
        <span class="ml-2 w-2 h-2 bg-green-400 rounded-full inline-block"></span>
      </div>
    </div>
    <div class="flex justify-center gap-4 mb-10">
      <a href="/products" class="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75l1.5 16.5A2.25 2.25 0 005.988 22.5h12.024a2.25 2.25 0 002.238-2.25l1.5-16.5M6.75 6.75V5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25v1.5" /></svg>
        Browse Products
      </a>
      <a href="/checkout" class="px-8 py-3 rounded-lg bg-white text-gray-900 font-semibold shadow hover:scale-105 transition-transform flex items-center gap-2 border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75l1.5 16.5A2.25 2.25 0 005.988 22.5h12.024a2.25 2.25 0 002.238-2.25l1.5-16.5M6.75 6.75V5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25v1.5" /></svg>
        Checkout
      </a>
    </div>
  </div>
</section>

<section class="py-16 bg-white text-center">
  <h2 class="text-3xl font-bold mb-4">Why Choose EcoStore?</h2>
  <p class="mb-10 text-gray-600 max-w-2xl mx-auto">Experience the future of online shopping with our innovative features and seamless user experience.</p>
  <div class="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto">
    <div class="bg-gray-100 rounded-xl p-8 flex-1">
      <div class="flex justify-center mb-3">
        <span class="inline-block bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.086a.563.563 0 00.475.346l5.517.442c.499.04.701.68.321 1.02l-4.204 3.684a.563.563 0 00-.182.557l1.285 5.385c.116.487-.41.87-.832.613l-4.646-2.885a.563.563 0 00-.586 0l-4.646 2.885c-.422.257-.948-.126-.832-.613l1.285-5.385a.563.563 0 00-.182-.557L2.042 10.393c-.38-.34-.178-.98.32-1.02l5.518-.442a.563.563 0 00.475-.346l2.125-5.086z" /></svg>
        </span>
      </div>
      <h3 class="font-semibold text-xl mb-2">Premium Quality</h3>
      <p class="text-gray-500">Curated products from trusted brands</p>
    </div>
    <div class="bg-gray-100 rounded-xl p-8 flex-1">
      <div class="flex justify-center mb-3">
        <span class="inline-block bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5V6m0 0v1.5m0-1.5h1.5m-1.5 0H12m6.364 1.636l-1.06 1.06m-9.192 9.192l-1.06 1.06m0-12.728l1.06 1.06m9.192 9.192l1.06 1.06M4.5 13.5H6m0 0h1.5m-1.5 0V12m0 1.5v1.5m12.728-9.192l-1.06-1.06m-9.192 9.192l-1.06-1.06" /></svg>
        </span>
      </div>
      <h3 class="font-semibold text-xl mb-2">Fast Delivery</h3>
      <p class="text-gray-500">Quick and reliable shipping worldwide</p>
    </div>
    <div class="bg-gray-100 rounded-xl p-8 flex-1">
      <div class="flex justify-center mb-3">
        <span class="inline-block bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 010 7.75" /></svg>
        </span>
      </div>
      <h3 class="font-semibold text-xl mb-2">Best Prices</h3>
      <p class="text-gray-500">Competitive pricing with regular deals</p>
    </div>
  </div>
</section>

<section class="py-16 bg-gray-900 text-white text-center">
  <h2 class="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
  <p class="mb-8 text-gray-300 max-w-2xl mx-auto">Join thousands of satisfied customers and discover amazing products at unbeatable prices.</p>
  <a href="/products" class="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform flex items-center gap-2 mx-auto w-fit">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3.75l1.5 16.5A2.25 2.25 0 005.988 22.5h12.024a2.25 2.25 0 002.238-2.25l1.5-16.5M6.75 6.75V5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25v1.5" /></svg>
    Explore Products Now
  </a>
</section>



