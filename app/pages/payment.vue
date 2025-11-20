<template>
  <div>
    <h1>Razorpay Payment</h1>
    <input type="text" v-model="amount" placeholder="Enter amount" class="border p-2">
    <button @click="payNow">
      Pay Now
    </button>
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

const amount = ref(100);
const products = ref(null);

async function payNow() {
  const res: any = await $fetch("/api/payments/create-order", {
    method: "POST",
    body: {
      amount: amount.value
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
      const verifyRes: any = await $fetch("/api/payments/verify-payment", {
        method: "POST",
        body: response,
      });

      if (verifyRes.status === "ok") {
        alert("Payment Successful!");
      } else {
        alert("Payment verification failed");
      }
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
</script>