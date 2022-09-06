export const useCartStore = defineStore("CartStore", () => {
  // state
  let items = ref([] as any[]);
  const deskree = useDeskree();

  watch(items, () => {
    deskree.user.updateCart(items.value)
  }, { deep: true })

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
  }

  function removeFromCart(idArr: number[]) {
    items.value = items.value.filter(item => !idArr.includes(item.item.sys.id));
  }

  // output
  return {
    items,
    totalCount,
    subTotalCount,
    taxTotal,
    total,
    addToCart,
    removeFromCart
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
