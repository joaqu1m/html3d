<script lang="ts" setup>
const { title } = defineProps(["title"]);
</script>
<template>
  <div class="h-[80%] bg-primary-black text-primary-white px-2 cursor-pointer">
    {{ title }}
  </div>
</template>
