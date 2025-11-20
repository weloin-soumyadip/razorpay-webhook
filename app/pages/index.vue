<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">

    <!-- Main Container -->
    <div class="max-w-md bg-white shadow-xl rounded-3xl p-10">
      
      <!-- Illustration -->
      <div class="flex justify-center mb-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
          alt="Onboarding"
          class="w-40 h-40 object-contain"
        />
      </div>

      <!-- Heading -->
      <h1 class="text-3xl font-bold mb-4">Welcome to Your Store</h1>
      <p class="text-gray-600 mb-8">
        Discover amazing products and enjoy a smooth shopping experience.
      </p>

      <!-- Get Started Button -->
      <button
        @click="start"
        class="w-full bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-900 transition"
      >
        Get Started
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
function start() {
  // Redirect to login or home or shop — your choice
  navigateTo("/auth/login");
}
</script>
