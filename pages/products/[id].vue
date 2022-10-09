<script setup>
import * as marked from "marked";

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const { data: product } = await useAsyncData(
  `product${route.params.id}`,
  async () => {
    if (route.params.id === "undefined") return productStore.singleProduct;
    await productStore.fetchProduct(route.params.id);
    return productStore.singleProduct;
  },
  {
    pick: ["fields", "sys"],
  }
);

const description = computed(() =>
  product.value ? marked.parse(product.value?.fields?.description) : null
);

function handleAddToCart(product) {
  cartStore.addToCart(product);
  useAlertsStore().success(product.fields.name + " added to cart");
}
</script>
<template>
  <div class="mt-10 max-w-6xl mx-auto mb-16 sm:mb-20">
    <div v-if="product">
      <div class="sm:flex">

        <img
          class="px-5 h-80 object-contain sm:w-1/3 mx-auto mb-4 md:sticky top-3"
          :src="product?.fields.image[0].fields?.file.url"
          :alt="product?.fields.image[0].fields?.file.description"
        />
        <div class="px-5 sm:pl-0 sm:w-2/3">
          <h1 class="text-2xl mb-2">{{ product?.fields.name }}</h1>
          <h2 class="mb-1">
            <ProductPrice :price="product.fields.price" />
            <ProductHeat :heatLevel="product.fields.heatLevel" />
          </h2>
          <div class="prose prose-sm">
            <p>{{ product.fields.summary }}</p>
          </div>

          <hr class="my-4" />

          <div class="prose mb-5" v-html="description" />
          <button class="btn btn-primary" @click="handleAddToCart(product)">
            Add to cart
          </button>

          <ProductReviews :productId="product.sys.id" />
        </div>
      </div>
    </div>
  </div>
</template>
