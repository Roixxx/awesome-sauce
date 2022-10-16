<template>

  <div class="mt-16 container">
    <h1 class="text-3xl mb-5 font-bold">Your Cart</h1>
    <client-only>
      <div class="md:flex w-full">
        <div class="md:w-3/4">

          <div v-if="!cartStore.items.length" class="italic text-center pt-10">Cart is empty</div>

          <div v-else class="overflow-x-auto">
            <div class="table w-full">
              <table class="w-full">
                <!-- head -->
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" @change="handleCheckAll($event)" :checked="checkedAll"/>
                      </label>
                    </th>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Number of Items</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="({item, amount}, i) in cartStore.items">
                    <th>
                      <label>
                        <input
                          v-model="selected"
                          type="checkbox"
                          class="checkbox"
                          :value="item.sys.id"
                        />
                      </label>
                    </th>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div class="avatar">
                          <div class="mask mask-squircle w-12 h-12">
                            <img
                              style="object-fit: contain"
                              :src="item.fields.image[0].fields.file.url"
                              :alt="item.fields.image[0].fields.title"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="font-bold">
                        {{ item.fields.name }}
                      </div>
                      <ProductHeat :heat-level="item.fields.heatLevel" />
                    </td>
                    <td>
                      <ProductPrice :price="item.fields.price" />
                    </td>

                    <td>
                      <input
                        class="input input-bordered w-20"
                        type="number"
                        min="1"
                        v-model="cartStore.items[i].amount"
                      />
                    </td>
                    <th>
                      <NuxtLink
                        :to="{
                          name: 'products-id',
                          params: { id: item.sys.id },
                        }"
                      >
                        <button class="btn btn-ghost btn-xs">details</button>
                      </NuxtLink>
                    </th>
                  </tr>
                </tbody>
              </table>
              <button v-if="selected.length" @click="cartStore.removeFromCart(selected); selected = [];" class="text-sm text-red-500">
                Remove Selected
              </button>
            </div>
          </div>
        </div>

        <div class="md:w-1/4 md:pl-5 mt-10 md:mt-0">
          <div class="card bg-slate-50">
            <div class="card-body">
              <ul>
                <li><strong>Subtotal</strong>: <ProductPrice :price="cartStore.subTotalCount"/></li>
                <li><strong>Estimated Taxes </strong>: <ProductPrice :price="cartStore.taxTotal"/></li>
                <li><strong>Total</strong>:  <ProductPrice :price="cartStore.total"/></li>
              </ul>
              <div class="card-actions justify-end w-full">
                <button :disabled="loading" class="btn btn-primary w-full" @click="handleCheckout">
                  {{loading ? 'Loading' : 'Checkout'}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup>

import { useCartStore } from '../stores/CartStore';

const selected = ref([]);
const cartStore = useCartStore();
const checkedAll = computed(() => selected.value.length === cartStore.items.length);
const loading = ref(false);

async function handleCheckout() {
  loading.value = true;
  const res = await $fetch('/api/cart', {
    method: 'POST',
    body: {
      products: cartStore.items.map(item => ({
        id: item.item.sys.id,
        quantity: item.amount,
      })),
      url: window.location.origin
    },
  });

  window.location.href = res.url;
}

function handleCheckAll(e) {
  const checked = e.target.checked;
  if (checked) {
    selected.value = cartStore.items.map(item => item.item.sys.id);
  } else {
    selected.value = [];
  }
}

</script>
