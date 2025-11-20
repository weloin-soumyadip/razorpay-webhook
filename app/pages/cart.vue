<template>
  <div class="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

    <!-- LEFT: Cart Items -->
    <div class="lg:col-span-3">
      <div v-if="!carts" class="w-full h-full flex justify-center items-center text-gray-500 text-2xl">
        Products are loading...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiProductCard 
          v-for="p in carts" 
          :key="p._id" 
          :id="p._id" 
          :title="p.title" 
          :category="p.category"
          :image="p.image" 
          :description="p.description" 
          :price="p.price" 
        />
      </div>
    </div>

    <!-- RIGHT: Summary Box -->
    <div v-if="totalAmount !== null" class="h-max bg-white/5 border border-gray-700 p-6 rounded-xl shadow-xl">
      <h2 class="text-xl font-semibold mb-4 text-gray-200">Order Summary</h2>

      <div class="text-lg text-gray-300 flex justify-between mb-2">
        <span>Total Items:</span>
        <span>{{ carts?.length }}</span>
      </div>

      <div class="text-xl font-bold flex justify-between mb-6">
        <span>Total Amount:</span>
        <span>₹{{ totalAmount }}</span>
      </div>

      <button
        @click="payNow"
        class="w-full bg-black text-white py-3 rounded-xl text-lg hover:bg-gray-900 transition"
      >
        Pay ₹{{ totalAmount }}
      </button>
    </div>

  </div>
</template>


<script lang="ts" setup>
import { useHead } from "#imports";

// Load Razorpay script dynamically
useHead({
  script: [
    {
      src: "https://checkout.razorpay.com/v1/checkout.js",
      defer: true
    }
  ]
});
const carts = ref<any>(null);
const totalAmount = ref<number | null>(null);

onMounted(async () => {
  try {
    const res = await $fetch("/api/cart/getall-carts");
    carts.value = res.carts;
    totalAmount.value = res.totalAmount;
  } catch (error: any) {
    console.error(error.message);
  }
});

async function payNow() {
  const res: any = await $fetch("/api/payments/create-order", {
    method: "POST",
    body: {
      amount: totalAmount.value,
      totalAmount: totalAmount.value,
      items: carts.value.map((p: any) => p._id) 
    }
  });
  if (!res.id) {
    alert("Order creation failed");
    return;
  }
  console.log(res);

  const options = {
    key: useRuntimeConfig().public.razorpayKeyId,
    amount: totalAmount.value,
    currency: res.currency,
    order_id: res.id,
    handler: async function (response: any) {
      console.log("response is here: ", response)
      navigateTo(`/payments/processing?order_id=${response.razorpay_order_id}`);
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
</script>
