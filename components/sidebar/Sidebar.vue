<script lang="ts" setup>
import { ICells } from "~/types";
import Cell from "~/components/sidebar/Cell.vue";

const mouseMoveEvent = inject("mouseMoveEvent");
const deselectEvent = inject("deselectEvent");

const sidebarHTMLElement = ref<HTMLElement | null>(null);

let totalHeight = ref<number | null>(null);
let selectedCell = ref<number | null>();

onMounted(() => {
  if (sidebarHTMLElement.value !== null && "offsetHeight" in sidebarHTMLElement.value) {
    totalHeight.value = sidebarHTMLElement.value.offsetHeight;
  }
});

watch(mouseMoveEvent, ({ movementY }) => {
  if (typeof selectedCell.value === "number") {
    cells[selectedCell.value].height += movementY;
  }
});
watch(deselectEvent, () => {
  selectedCell.value = null;
});

const { tabWidth, leftDirection, cells } = defineProps<ICells>();
</script>
<template>
  <div
    v-if="tabWidth"
    ref="sidebarHTMLElement"
    :style="{
      width: tabWidth + 'px',
    }"
    class="h-full relative bg-secondary-gray flex flex-col"
  >
    <Cell
      v-for="(cell, i) in cells"
      :key="i"
      :height="cell.height"
      :isLastComponent="i === cells.length - 1"
      :tabs="cell.tabs"
      @selectCell="selectedCell = i"
    />
    <div
      :class="leftDirection ? '-right-[5px]' : '-left-[5px]'"
      class="h-full w-[10px] cursor-col-resize absolute hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 z-10"
      @mousedown="$emit('selectElement')"
    />
  </div>
</template>
