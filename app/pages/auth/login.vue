<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

      <!-- Title -->
      <h2 class="text-3xl font-bold text-center mb-6">Welcome Back</h2>
      <p class="text-gray-500 text-center mb-8">Sign in to continue</p>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">

        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Email</label>
          <input v-model="email" type="email" required
            class="w-full px-4 py-3 placeholder:text-gray-800 text-gray-800 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email" />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Password</label>
          <input v-model="password" type="password" required
            class="w-full px-4 py-3 rounded-xl border border-gray-300 placeholder:text-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password" />
        </div>

        <!-- Login Button -->
        <button type="submit"
          class="w-full bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-900 transition">
          Login
        </button>

      </form>

      <!-- Extra Links -->
      <p class="text-center text-gray-600 mt-6">
        Don’t have an account?
        <NuxtLink to="/register" class="text-black font-semibold hover:underline">
          Register
        </NuxtLink>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");

async function handleLogin() {
  console.log("Logging in with:", email.value, password.value);
  try {
    const res: any = await $fetch("https://soumyadip.weloin.net/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value }
    });
    console.log("res is: ", res);
    window.localStorage.setItem("access_token", res.access_token)
    await navigateTo("/products");
  } catch (error: any) {
    console.error(error);
  }
}
</script>
