<script setup>

const { siteName } = useAppConfig();
const cartStore = useCartStore();
const dropdown = ref(null);
function closeDropdown () {
  document.activeElement?.blur()
}
</script>
<template>
  <div class="navbar bg-base-100 shadow-md sticky top-0 bg-white z-10">
    <div class="container">
      <div class="flex-1">
        <NuxtLink class="btn btn-ghost normal-case text-xl -ml-4" to="/">{{siteName}}</NuxtLink>
      </div>
      <!-- Right Side -->
      <client-only>
        <div class="flex-none">
          <div class="dropdown dropdown-end" ref="dropdown">
            <CartIcon :loading="false" :count="cartStore.totalCount" />
            <div
              tabindex="0"
              class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div class="card-body">
                <span class="font-bold text-lg">{{ cartStore.totalCount }} Items</span>
                <span class="text-info">Subtotal: <ProductPrice :price="cartStore.subTotalCount" /></span>
                <div class="card-actions">
                  <NuxtLink :to="{ name: 'cart' }" @click="closeDropdown">
                    <button class="btn btn-primary btn-block">View cart</button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>


    </div>
  </div>
</template>
