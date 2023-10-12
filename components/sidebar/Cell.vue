<script lang="ts" setup>
import x_icon from '~/assets/icons/x_icon.svg';
import { ICellNonNull } from '~/types';

const { height, isLastComponent, tabs } = defineProps<ICellNonNull>();

const selectedTab = ref<number>(0);
const heldTab = useHeldTab();
</script>
<template>
  <div
    :class="{ grow: isLastComponent }"
    :style="{ height: isLastComponent ? 'auto' : height + 'px' }"
    class="flex flex-col relative"
  >
    <div class="bg-menu-light-gray min-h-[40px] flex overflow-x-hidden">
      <div
        v-for="(tab, i) in tabs"
        :key="i"
        :class="selectedTab === i ? 'bg-menu-black' : 'bg-menu-gray'"
        class="flex items-center justify-center h-full text-primary-white font-medium text-sm px-3 gap-2 min-w-max cursor-pointer select-none"
        @click="selectedTab = i"
        @mousedown="
          ({ x, y }) => {
            heldTab.coords.x = x;
            heldTab.coords.y = y;
            heldTab.tab = tab;
          }
        "
      >
        {{ tab.title }}
        <button>
          <img :src="x_icon" alt="Close Icon" class="w-4" />
        </button>
      </div>
    </div>
    <div class="bg-menu-black min-h-[16px]" />
    <div
      class="flex flex-col h-full w-full overflow-y-scroll p-4 gap-2 bg-secondary-gray"
    >
      <component :is="tabs[selectedTab].component" />
    </div>
    <div
      v-if="!isLastComponent"
      class="w-full h-[10px] cursor-row-resize absolute hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 -bottom-[5px] z-10"
      @mousedown="$emit('selectCell')"
    />
  </div>
</template>
