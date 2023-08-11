<template>
  <div>
    <p>Product</p>
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    const cupsOfWater: globalThis.Ref<number> = ref(0);
    const lastCup: globalThis.Ref<Date> = ref(new Date());

    function drinkCup(): void {
      cupsOfWater.value++;
      lastCup.value = new Date();
    }

    return {
      cupsOfWater,
      lastCup,
      drinkCup,
    };
  },
};
</script>
