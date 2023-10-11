<script lang="ts" setup>
import x_icon from "~/assets/icons/x_icon.svg";
import { ICellTab } from "~/types";

const { ownHeight, isLastComponent, tabs } = defineProps<{
  ownHeight: number | null,
  isLastComponent: boolean,
  tabs: ICellTab[]
}>();

const selectedTab = ref<number>(0);
</script>
<template>
  <div
    class="flex flex-col relative"
    :class="{ grow: isLastComponent }"
    :style="{ height: ownHeight + 'px' }"
  >
    <div class="bg-menu-light-gray h-10 flex overflow-x-hidden">
      <div
        v-for="({ title }, i) in tabs"
        :key="i"
        @click="selectedTab = i"
        class="flex items-center justify-center h-full text-primary-white font-medium text-sm px-3 gap-2 min-w-max cursor-pointer select-none"
        :class="selectedTab === i ? 'bg-menu-black' : 'bg-menu-gray'"
      >
        {{ title }}
        <button>
          <img :src="x_icon" class="w-4" alt="Close Icon" />
        </button>
      </div>
    </div>
    <div class="bg-menu-black h-4" />
    <component
      :is="tabs[selectedTab].component"
    />
    <div
      class="w-full h-[10px] cursor-row-resize absolute hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 -bottom-[5px] z-10"
      v-if="!isLastComponent"
    />
  </div>
</template>
