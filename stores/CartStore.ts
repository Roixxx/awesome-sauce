import {useLocalStorage} from "@vueuse/core";
import {skipHydrate} from "pinia";

export const useCartStore = defineStore("CartStore", () => {
  // state
  const LocalStorageCart = useLocalStorage('cart', []);

  const items = ref(LocalStorageCart.value as any[]);

  // getters
  const totalCount = computed(() => items.value.reduce((acc, item) => acc + item.amount, 0));
  const subTotalCount = computed( () => (
    items.value.reduce((acc, item) => {
      return acc + item.item.fields.price * item.amount;
    }, 0)
  ));
  const taxTotal = computed(() => subTotalCount.value * 0.1);
  const total = computed(() => subTotalCount.value + taxTotal.value);

  // actions
  function addToCart(item: any) {
    const existingItem = items.value.find(i => i.item.sys.id === item.sys.id);
    if (existingItem) {
      existingItem.amount++;
    } else {
      items.value.push({ item, amount: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(items.value));
  }

  function removeFromCart(idArr: number[]) {
    items.value = items.value.filter(item => !idArr.includes(item.item.sys.id));
  }

  function clearCart() {
    items.value = [];
    LocalStorageCart.value = [];
  }

  // output
  return {
    items: skipHydrate(items),
    totalCount,
    subTotalCount,
    taxTotal,
    total,
    addToCart,
    removeFromCart,
    clearCart
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
