<template>
  <div class="lg:p-6 p-4 max-w-7xl mx-auto min-h-screen flex items-center justify-center">

    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Image -->
      <img :src="product.image" :alt="product.title" class="w-full h-96 object-contain rounded-xl shadow" />

      <!-- Product Info -->
      <div class="space-y-4">
        <h1 class="text-3xl font-semibold">{{ product.title }}</h1>
        <p class="text-gray-400 text-sm">Category: {{ product.category }}</p>

        <p class="text-gray-400 leading-relaxed">{{ product.description }}</p>

        <div class="flex items-center gap-2 text-yellow-500 text-lg">
          <span class="font-semibold">Rating:</span>
          <span>{{ product.rating?.rate }} ★ ({{ product.rating?.count }} reviews)</span>
        </div>

        <p class="text-2xl font-bold text-gray-300">${{ product.price }}</p>
        <div class="flex gap-4">
          <button @click="payNow" class="w-full bg-black cursor-pointer text-white py-3 rounded-xl text-lg hover:bg-gray-950">
          Buy now
        </button>
          <!-- <button @click="addToCart"
            class="w-full bg-black cursor-pointer text-white py-3 rounded-xl text-lg hover:bg-gray-950">
            Add to cart
          </button> -->
          <button @click="addToCart"
            class="w-full bg-yellow-500 cursor-pointer text-white py-3 rounded-xl text-lg hover:bg-yellow-600">
            Add to cart
          </button>
        </div>

      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center py-20 text-gray-500 text-lg">Loading product...</div>
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

const route = useRoute()
const product = ref<any>(null)
const toast = useToast();

onMounted(async () => {
  try {
    const id = route.params.id;
    const res: any = await $fetch(`https://soumyadip.weloin.net/api/products/get-product-by-id/${id}`);
    console.log("product is: ", res);
    product.value = res.product;
  } catch (err) {
    console.error('Failed to load product:', err)
  }
});

async function payNow() {
  const res: any = await $fetch("/api/payments/create-order", {
    method: "POST",
    body: {
      amount: product.value.price,
      totalAmount: product.value.price,
      items: [product.value._id]
    }
  });
  if (!res.id) {
    alert("Order creation failed");
    return;
  }
  console.log(res);

  const options = {
    key: useRuntimeConfig().public.razorpayKeyId,
    amount: res.amount,
    currency: res.currency,
    order_id: res.id,
    handler: async function (response: any) {
      console.log("response is here: ", response)
      // const verifyRes: any = await $fetch("/api/payments/verify-payment", {
      //   method: "POST",
      //   body: response,
      // });

      // if (verifyRes.status === "ok") {
      //   alert("Payment Successful!");
      //   navigateTo("/payments/success-payment");
      // } else {
      //   alert("Payment verification failed");
      //   navigateTo("/payments/failed-payment");
      // }
      navigateTo(`/payments/processing?order_id=${response.razorpay_order_id}`);
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}

// function goToCart() {
// }

async function addToCart() {
  try {
    const res = await $fetch("/api/cart/addto-cart", {
      body: {
        id: route.params.id
      },
      method: "POST"
    });
    toast.add({
      title: "Success!",
      description: "Item added to cart!",
      color: "success"
    });
    navigateTo("/cart");
  } catch (error: any) {
    console.log(error.message);
  }
} 
</script>