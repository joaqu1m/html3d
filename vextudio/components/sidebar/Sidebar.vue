<script setup lang="ts">
import { ICells } from "~/types";
import Cell from "~/components/sidebar/Cell.vue";

const sidebarHTMLElement = ref<HTMLElement | null>(null);

let totalHeight = ref<number | null>(null);

onMounted(() => {
  if (sidebarHTMLElement.value !== null && "offsetHeight" in sidebarHTMLElement.value) {
    totalHeight.value = sidebarHTMLElement.value.offsetHeight;
  }
});

const { tabWidth, leftDirection, cells } = defineProps<ICells>();
</script>
<template>
  <div
    v-if="tabWidth"
    class="h-full relative bg-secondary-gray flex flex-col"
    :style="{
      width: tabWidth + 'px',
    }"
    ref="sidebarHTMLElement"
  >
    <Cell
      v-for="(cell, i) in cells"
      :key="i"
      :ownHeight="cell.height"
      :isLastComponent="i === cells.length - 1"
      :tabs="cell.tabs"
    />
    <div
      class="h-full w-[10px] cursor-col-resize absolute hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 z-10"
      :class="leftDirection ? '-right-[5px]' : '-left-[5px]'"
      @mousedown="$emit('selectElement')"
    />
  </div>
</template>
