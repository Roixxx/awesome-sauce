<script setup>
const productStore = useProductStore();
useAsyncData("products", async () => productStore.fetchProducts());
</script>
<template>
  <div>
    <HomeHero />
    <div class="container">
      <div class="flex justify-end mt-10">
        <ProductFilters />
      </div>

      <div
        v-if="productStore.products.length"
        class="gap-7 pt-10 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap justify-items-stretch items-stretch"
      >
        <ProductCard
          v-for="product in productStore.products"
          :product="product"
          :key="product.sys.id"
          class="mb-5"
        />
      </div>
      <div v-else>
        <div class="text-center pt-10">Products not found</div>
      </div>
    </div>

  </div>

</template>
