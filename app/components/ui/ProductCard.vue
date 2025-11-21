<template>
  <div
    class="flex flex-col border border-gray-700 rounded-2xl p-4 shadow-lg bg-transparent h-full"
  >
    <!-- Image -->
    <div class="w-full h-60 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center">
      <img
        :src="props.image"
        :alt="props.title"
        class="object-contain h-full w-full"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 mt-4 gap-2">
      <h2 class="text-lg font-semibold leading-tight">
        {{ props.title }}
      </h2>
      <p class="text-xs text-gray-500">
        {{ props.category }}
      </p>

      <p class="text-gray-400 text-sm mt-2 line-clamp-3">
        {{ props.description }}
      </p>

      <div class="font-bold text-xl mt-3">
        ${{ props.price }}
      </div>

      <!-- Push button to bottom -->
      <button
        @click="navigateTo(`/product/${props.id}`)"
        class="bg-black text-white w-full py-2 rounded-xl mt-auto hover:bg-gray-950"
      >
        View Product
      </button>
    </div>
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

<style scoped>
/* fallback if user lacks tailwind line-clamp plugin */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
