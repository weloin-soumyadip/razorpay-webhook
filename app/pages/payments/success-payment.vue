<template>
  <div class="min-h-screen flex items-center justify-center bg-linear-to-br from-green-500 to-emerald-700 p-6">
    <div class="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg text-center">

      <!-- Success Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-emerald-100 p-4 rounded-full">
          <svg
            class="w-20 h-20 text-emerald-600 animate-check"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-4xl font-bold text-emerald-700 mb-4">
        Payment Successful!
      </h1>

      <!-- Subtitle -->
      <p class="text-gray-600 text-lg leading-relaxed mb-6">
        Your payment was processed successfully.  
        Thank you for your purchase! 🎉
      </p>

      <!-- Info Box -->
      <div class="bg-gray-100 rounded-xl p-6 mb-8">
        <p class="text-gray-500">Order Status</p>
        <p class="text-xl font-semibold text-emerald-700">Confirmed</p>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col space-y-3">
        <NuxtLink
          to="/products"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-lg shadow-md transition"
        >
          Back to Home
        </NuxtLink>

        <NuxtLink
          to="/orders"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl text-lg shadow-sm transition"
        >
          View My Orders
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
@keyframes checkPop {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); }
}

.animate-check {
  animation: checkPop 0.6s ease-out forwards;
}
</style>
