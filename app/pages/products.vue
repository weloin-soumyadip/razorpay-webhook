<template>
  <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-if="!products" class="w-screen h-screen flex justify-center items-center text-gray-500 text-2xl">Products are
      loading...</div>
    <UiProductCard v-else v-for="p in products" :id="p._id" :key="p._id" :title="p.title" :category="p.category"
      :image="p.image" :description="p.description" :price="p.price" />
  </div>
</template>

<script setup lang="ts">
type Product = {
  _id: string,
  title: string,
  category: string,
  image: string,
  description: string,
  price: number,
}
const products = ref<Product[] | null>(null);

onMounted(async () => {
  const token = window.localStorage.getItem("access_token");
  try {
    const data: any = await $fetch("https://soumyadip.weloin.net/api/products/get-products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(data);
    products.value = data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
</script>
