<script lang="ts" setup>
import { ICells } from '~/types';
import Cell from '~/components/sidebar/Cell.vue';

const isSomethingSelected = useIsSomethingSelected();
const heldTab = useHeldTab();

const mouseMoveEvent = inject('mouseMoveEvent');
const deselectEvent = inject('deselectEvent');

const sidebarHTMLElement = ref<HTMLElement | null>(null);

let totalHeight = ref<number | null>(null);
let selectedCell = ref<number | null>(null);

const isHeightLoading = computed(() => {
  return totalHeight.value === null;
});

onMounted(() => {
  if (sidebarHTMLElement.value && 'offsetHeight' in sidebarHTMLElement.value) {
    totalHeight.value = sidebarHTMLElement.value.offsetHeight;
    for (let i = 0; i < cells.length; i++) {
      cells[i].height = totalHeight.value / cells.length;
    }
  }
});

watch(mouseMoveEvent, ({ movementY }: any) => {
  if (typeof selectedCell.value === 'number') {
    if (movementY < 0) {
      for (let i = selectedCell.value; i >= 0; i--) {
        if (cells[i] && cells[i].height!! >= 200) {
          cells[selectedCell.value + 1].height!! -= movementY;
          cells[i].height += movementY;
          break;
        }
      }
    } else {
      for (let i = selectedCell.value; i < cells.length; i++) {
        if (cells[i + 1] && cells[i + 1].height!! >= 200) {
          cells[selectedCell.value].height += movementY;
          cells[i + 1].height!! -= movementY;
          break;
        }
      }
    }
  }
});
watch(deselectEvent!!, () => {
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
    <template v-if="!isHeightLoading">
      <Cell
        v-for="(cell, i) in cells"
        :key="i"
        :height="cell.height!!"
        :isLastComponent="i === cells.length - 1"
        :tabs="cell.tabs"
        @selectCell="
          () => {
            selectedCell = i;
            isSomethingSelected = true;
          }
        "
      />
    </template>
    <div
      :class="leftDirection ? '-right-[5px]' : '-left-[5px]'"
      class="h-full w-[10px] cursor-col-resize absolute hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 z-10"
      @mousedown="$emit('selectElement')"
    />
  </div>
</template>
