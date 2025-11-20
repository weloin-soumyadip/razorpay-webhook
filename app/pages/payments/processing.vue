<script setup>
const route = useRoute()
const orderId = route.query.order_id

async function checkStatus() {
  const res = await $fetch(`https://soumyadip.weloin.net/api/orders/order-status?id=${orderId}`)
  // console.log("payment processing: ", res);
  if (res.paymentStatus === "paid") {
    return navigateTo("/payments/success-payment")
  }

  if (res.paymentStatus === "failed") {
    return navigateTo("/payments/failed-payment")
  }

  setTimeout(checkStatus, 2000)
}

onMounted(checkStatus)
</script>

<template>
  <div class="p-10 text-center">
    <h1 class="text-2xl font-semibold">Processing your payment...</h1>
    <p class="text-gray-500 mt-2">Please wait ⏳</p>
  </div>
</template>
