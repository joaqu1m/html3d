<script lang="ts" setup>
import PolygonOptions from "~/components/sidebar/PolygonOptions.vue";

type MainTab = "leftTab" | "rightTab";

const mainTabs = {
  leftTab: ref<number | null>(null),
  rightTab: ref<number | null>(300),
};

const selectedElement = ref<MainTab | null>(null);
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col"
    @mouseup="selectedElement = null"
    @mousedown="
      ({ button }) => {
        if (button === 2) selectedElement = null;
      }
    "
    @mousemove="
      ({ movementX }) => {
        if (selectedElement && mainTabs[selectedElement]) {
          let newTabWidth;
          if (selectedElement === 'rightTab') {
            newTabWidth =
              //@ts-ignore
              mainTabs[selectedElement].value - movementX;
          } else {
            newTabWidth =
              //@ts-ignore
              mainTabs[selectedElement].value + movementX;
          }
          if (newTabWidth < 200) newTabWidth = 200;
          if (newTabWidth > 500) newTabWidth = 500;
          //@ts-ignore
          mainTabs[selectedElement].value = newTabWidth;
        }
      }
    "
  >
    <Header />
    <div class="grow flex">
      <Sidebar
        :leftDirection="true"
        :tabWidth="mainTabs['leftTab'].value"
        @selectElement="selectedElement = 'leftTab'"
      />
      <div
        class="bg-gradient-to-b from-3d-gradient-start to-3d-gradient-end max-w-full max-h-full grow"
      >
        {{ selectedElement }}
        {{ mainTabs[selectedElement!!] }}
      </div>
      <Sidebar
        :leftDirection="false"
        :tabWidth="mainTabs['rightTab'].value"
        @selectElement="selectedElement = 'rightTab'"
        :content="[[{ title: 'Polygon Options', component: PolygonOptions }]]"
      />
    </div>
  </div>
</template>
