<script lang="ts" setup>
import AnimationMenu from "~/components/sidebar/AnimationMenu.vue";
import ObjectTree from "~/components/sidebar/ObjectTree.vue";
import PolygonOptions from "~/components/sidebar/PolygonOptions.vue";
import { MainTab } from "~/types";

const mainTabs = {
  leftTab: ref<number | null>(null),
  rightTab: ref<number | null>(300)
};

const selectedElement = ref<MainTab | null>(null);
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col"
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
            newTabWidth = mainTabs[selectedElement].value - movementX;
          } else {
            newTabWidth = mainTabs[selectedElement].value + movementX;
          }
          if (newTabWidth < 200) newTabWidth = 200;
          if (newTabWidth > 500) newTabWidth = 500;
          mainTabs[selectedElement].value = newTabWidth;
        }
      }
    "
    @mouseup="selectedElement = null"
  >
    <Header />
    <div class="grow flex">
      <Sidebar
        :cells="[]"
        :leftDirection="true"
        :tabWidth="mainTabs['leftTab'].value"
        @selectElement="selectedElement = 'leftTab'"
      />
      <div
        class="bg-gradient-to-b from-3d-gradient-start to-3d-gradient-end max-w-full max-h-full grow"
      />
      <Sidebar
        :cells="[
          {
            tabs: [{ title: 'Object Tree', component: markRaw(ObjectTree) }],
            height: 200,
          },
          {
            tabs: [
              {
                title: 'Polygon Options',
                component: markRaw(PolygonOptions)
              },
              { title: 'Animation Menu', component: markRaw(AnimationMenu) },
            ],
            height: null,
          },
        ]"
        :leftDirection="false"
        :tabWidth="mainTabs['rightTab'].value"
        @selectElement="selectedElement = 'rightTab'"
      />
    </div>
  </div>
</template>
