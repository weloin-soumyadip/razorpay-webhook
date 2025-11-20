<template>
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Create Product</h1>

    <form @submit.prevent="submitForm" enctype="multipart/form-data" class="space-y-4">

      <input v-model="title" type="text" placeholder="Title" class="border p-2 w-full" required />

      <textarea v-model="description" placeholder="Description" class="border p-2 w-full" required></textarea>

      <input v-model="category" type="text" placeholder="Category" class="border p-2 w-full" required />

      <input v-model.number="price" type="number" placeholder="Price" class="border p-2 w-full" required />

      <input @change="handleFile" type="file" accept="image/*" class="border p-2 w-full" required />

      <button class="bg-blue-600 text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const title = ref("");
const description = ref("");
const category = ref("");
const price = ref(0);
const image = ref<File | null>(null);

const handleFile = (e: any) => {
  image.value = e.target.files[0];
};

const submitForm = async () => {
  const form = new FormData();
  form.append("title", title.value);
  form.append("description", description.value);
  form.append("category", category.value);
  form.append("price", price.value.toString());
  form.append("image", image.value as File);

  try {
    const res = await $fetch("/api/products/create-product", {
      method: "POST",
      body: form,
    });

    alert("Product Created!");

    form.append("title", "");
    form.append("description", "");
    form.append("category", "");
    form.append("price", "");
    form.append("image", "");
  } catch (e) {
    console.error(e);
  }
};
</script>
