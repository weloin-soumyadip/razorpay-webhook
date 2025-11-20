<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen p-4">
    <div class="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
      <div class="flex justify-center mb-4">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
      <p class="text-gray-600 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>

      <div class="bg-gray-50 p-4 rounded-xl text-left mb-6">
        <p class="text-gray-700"><span class="font-semibold">Order ID:</span> {{ orderId }}</p>
        <p class="text-gray-700"><span class="font-semibold">Amount Paid:</span> ₹{{ amount }}</p>
        <p class="text-gray-700"><span class="font-semibold">Status:</span> Completed</p>
      </div>

      <NuxtLink to="/" class="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-xl transition-all">Go to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Using static values (no props)
const orderId = "PAY123456";
const amount = 499;
</script>
