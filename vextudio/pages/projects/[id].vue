<template>
  <div>
    <p>Product</p>
    <p>{{ aaa }}</p>
    <button @click="bbb">bbb</button>
    <p>{{ ccc }}</p>
  </div>
</template>
<script setup lang="ts">

const aaa: globalThis.Ref<number> = ref(0);
const ccc: globalThis.Ref<Date> = ref(new Date());

function bbb(): void {
  aaa.value++;
  ccc.value = new Date();
}

</script>
