<template>
  <div>
    <hr class="my-10" />
    <div class="flex">
      <div class="text-xl mb-4 mr-4">Product reviews</div>

      <div class="mb-4">
        <label class="btn btn-accent btn-sm" for="review-modal">Add review</label>
      </div>
    </div>

    <AppSpinner style="transform: translateY(15px)" v-if="loading"/>

    <ul class="flex flex-col gap-4" v-if="reviews?.length">
      <li v-for="review in reviews" class="card bg-base-100 border">
        <div class="card-body">
          <div class="flex items-center flex-wrap">
            <div class="font-bold mr-2">{{review.title}}</div>
            <div class="mr-3">{{ "⭐️".repeat(review.rating) }}</div>
            <div class="ml-auto">{{ new Date(review.createdAt).toLocaleDateString() }}</div>
          </div>

          <p>{{ review.text }}</p>
        </div>
      </li>
    </ul>
    <div v-else-if="!reviews">Error loading. Try again later</div>
    <div v-else-if="!loading">No reviews yet</div>

    <ProductReviewForm :productId="productId" @reviewSent="loadReviews"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDeskree } from '../composables/UseDeskree';
import ProductReviewForm from './ProductReviewForm';

const loading = ref(false);
const deskree = useDeskree();
const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const reviews = ref([]);
async function loadReviews() {
  loading.value = true;
  const res = await deskree.reviews.get(props.productId).catch(() => null);
  reviews.value = res?.data.map(item => item.attributes);
  loading.value = false;
}
loadReviews();


</script>
