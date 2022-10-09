<template>
  <client-only>
    <input ref="modal" type="checkbox" id="review-modal" class="modal-toggle" />
    <label for="review-modal" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <label for="review-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="text-lg font-bold mb-3">Review</div>

        <FormKit
          id="reviewForm"
          type="form"
          :incomplete-message="false"
          submit-label="Submit"
          @submit="submitReview"
          :actions="false"
          #default="{ value }">
          <FormKit
            type="text"
            label="Your name*"
            name="title"
            validation="required|alpha|length:2"
          />

          <FormKit
            name="rating"
            v-model="stars"
            type="range"
            :label="`Rating: ${stars} stars`"
            min="1"
            max="5"
          />

          <FormKit
            name="text"
            type="textarea"
            label="Your comment*"
            rows="5"
            validation="required|length:2"
          />
          <FormKit
            type="submit"
            label="Submit"
          />
        </FormKit>
      </label>
    </label>
  </client-only>
</template>

<script setup>
import { ref } from 'vue';
import { reset } from '@formkit/vue';
defineEmits(['submitReview']);
const deskree = useDeskree();
const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const stars = ref(5);

const modal = ref(null);

const submitReview = async (data) => {
  await deskree.reviews.submit({...data, product_id: props.productId});
  modal.checked = false;
  useAlertsStore().success("Review sent");
  reset('reviewForm');
}

</script>

<style scoped>

</style>