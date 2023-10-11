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
    :class="{ grow: isLastComponent }"
    :style="{ height: ownHeight + 'px' }"
    class="flex flex-col relative"
  >
    <div class="bg-menu-light-gray h-10 flex overflow-x-hidden">
      <div
        v-for="({ title }, i) in tabs"
        :key="i"
        :class="selectedTab === i ? 'bg-menu-black' : 'bg-menu-gray'"
        class="flex items-center justify-center h-full text-primary-white font-medium text-sm px-3 gap-2 min-w-max cursor-pointer select-none"
        @click="selectedTab = i"
      >
        {{ title }}
        <button>
          <img :src="x_icon" alt="Close Icon" class="w-4" />
        </button>
      </div>
    </div>
    <div class="bg-menu-black h-4" />
    <component
      :is="tabs[selectedTab].component"
    />
    <div
      v-if="!isLastComponent"
      class="w-full h-[10px] cursor-row-resize absolute hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 -bottom-[5px] z-10"
      @click="$emit('select')"
    />
  </div>
</template>
