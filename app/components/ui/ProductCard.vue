<template>
  <div
    class="max-w-sm mx-auto p-4 rounded-2xl shadow-lg bg-transparent border border-gray-700 flex flex-col justify-between">
    <div>
      <h2 class="text-xl font-semibold">{{ props.title }}</h2>
      <p class="text-sm text-gray-500">{{ props.category }}</p>

      <img :src="props.image" :alt="props.title" class="w-full h-64 object-contain rounded-xl mt-4" />

      <p class="text-gray-700 text-sm mt-3">{{ props.description.length > 50 ? props.description.slice(0, 50) + "..." :
        props.description}}</p>

      <div class="flex items-center justify-start mt-4">
        <span class="text-lg font-bold">${{ props.price }}</span>

        <!-- <div class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span>{{ props.rating?.rate }} ({{ props.rating?.count }})</span>
      </div> -->
      </div>
    </div>

    <button @click="navigateTo(`/product/${props.id}`)" class="w-full cursor-pointer bg-black text-white py-2 rounded-xl mt-4 hover:bg-gray-950">
      View Product
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string,
  title: string,
  category: string,
  image: string,
  description: string,
  price: number,
}>()
</script>