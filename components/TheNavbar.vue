<script setup>

const { siteName } = useAppConfig();
const deskree = useDeskree();
const cartStore = useCartStore();

</script>
<template>
  <div class="navbar bg-base-100 shadow-md">
    <div class="container mx-auto">
      <div class="flex-1">
        <NuxtLink class="btn btn-ghost normal-case text-xl" to="/">{{siteName}}</NuxtLink>
      </div>
      <!-- Right Side -->
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <CartIcon :loading="false" :count="cartStore.totalCount" />
          <div
            tabindex="0"
            class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div class="card-body">
              <span class="font-bold text-lg">{{ cartStore.totalCount }} Items</span>
              <span class="text-info">Subtotal: <ProductPrice :price="cartStore.subTotalCount" /></span>
              <div class="card-actions">
                <NuxtLink :to="{ name: 'cart' }">
                  <button class="btn btn-primary btn-block">View cart</button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
