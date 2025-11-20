<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

      <!-- Title -->
      <h2 class="text-3xl font-bold text-center mb-6">Create Account</h2>
      <p class="text-gray-500 text-center mb-8">Sign up to get started</p>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">

        <!-- Name -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Name</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your name"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Create a password"
          />
        </div>

        <!-- Register Button -->
        <button
          type="submit"
          class="w-full bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-900 transition"
        >
          Register
        </button>

      </form>

      <!-- Extra Links -->
      <p class="text-center text-gray-600 mt-6">
        Already have an account?
        <NuxtLink to="/login" class="text-black font-semibold hover:underline">
          Login
        </NuxtLink>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref("");
const email = ref("");
const password = ref("");

async function handleRegister() {
  console.log("Registering:", name.value, email.value, password.value);

  // Example API call (you can connect your backend here)
  const res = await $fetch("https://soumyadip.weloin.net/api/auth/register", {
    method: "POST",
    body: { name: name.value, email: email.value, password: password.value }
  });
  if(res)
    navigateTo("/login");
}
</script>
