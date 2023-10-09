<script setup lang="ts">
import Cell from "./Cell.vue";

const { tabWidth, leftDirection, content } = defineProps([
  "tabWidth",
  "leftDirection",
  "content",
]);
</script>
<template>
  <div
    v-if="tabWidth"
    class="h-full relative bg-secondary-gray"
    :style="{
      width: tabWidth + 'px',
    }"
  >
    <div
      class="h-full w-[10px] cursor-col-resize absolute hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300"
      :class="leftDirection ? '-right-[5px]' : '-left-[5px]'"
      @mousedown="$emit('selectElement')"
    />
    <Cell v-for="(items, i) in content" :key="i" :items="items" />
  </div>
</template>
