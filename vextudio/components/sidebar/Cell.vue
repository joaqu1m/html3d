<script lang="ts" setup>
import x_icon from "~/assets/icons/x_icon.svg";
const { items } = defineProps(["items"]);
</script>

<template>
  <div>
    <div class="flex flex-col">
      <div class="bg-menu-light-gray h-8 flex">
        <div
          v-for="({ title }, i) in items"
          :key="i"
          class="bg-menu-black flex items-center justify-center h-full text-primary-white font-medium text-sm px-3 gap-2 overflow-x-scroll min-w-max"
        >
          {{ title }}
          <button>
            <img :src="x_icon" class="w-4" alt="Close Icon" />
          </button>
        </div>
      </div>
      <div class="bg-menu-black h-4" />
    </div>
    <component v-for="({ component }, i) in items" :key="i" :is="component" />
  </div>
</template>
