<script lang="ts" setup>
import ObjectTree from '~/components/sidebar/ObjectTree.vue';
import PolygonOptions from '~/components/sidebar/PolygonOptions.vue';
import { MainTab } from '~/types';
import AnimationMenu from '~/components/sidebar/AnimationMenu.vue';

let isSomethingSelected = useIsSomethingSelected();

const mainTabs = {
  leftTab: ref<number | null>(null),
  rightTab: ref<number | null>(300),
};

const mouseMoveEvent = ref(null);
const deselectEvent = ref(null);

const handleDeselect = (event: any) => {
  deselectEvent.value = event;
  isSomethingSelected.value = false;
  selectedElement.value = null;
};

const handleMouseMove = (event: any) => {
  mouseMoveEvent.value = event;
  if (selectedElement.value && mainTabs[selectedElement.value]) {
    let newTabWidth;
    if (selectedElement.value === 'rightTab') {
      newTabWidth = mainTabs[selectedElement.value].value!! - event.movementX;
    } else {
      newTabWidth = mainTabs[selectedElement.value].value + event.movementX;
    }
    if (newTabWidth < 200) newTabWidth = 200;
    if (newTabWidth > 500) newTabWidth = 500;
    mainTabs[selectedElement.value].value = newTabWidth;
  }
};

let selectedElement = ref<MainTab | null>(null);

const leftCells = ref([
  {
    tabs: [{ title: 'Object Tree', component: markRaw(ObjectTree) }],
    height: null,
    isLastComponent: null,
  },
  {
    tabs: [
      {
        title: 'Polygon Options',
        component: markRaw(PolygonOptions),
      },
    ],
    height: null,
    isLastComponent: null,
  },
  {
    tabs: [{ title: 'Animation Menu', component: markRaw(AnimationMenu) }],
    height: null,
    isLastComponent: null,
  },
]);

provide('mouseMoveEvent', mouseMoveEvent);
provide('deselectEvent', deselectEvent);
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col"
    :class="isSomethingSelected && 'no-user-select'"
    @mousedown="
      (event) => {
        if (event.button === 2) handleDeselect(event);
      }
    "
    @mousemove="handleMouseMove"
    @mouseup="handleDeselect"
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
      >
        <!-- {{ isSomethingSelected }} -->
      </div>
      <Sidebar
        :cells="leftCells"
        :leftDirection="false"
        :tabWidth="mainTabs['rightTab'].value"
        @selectElement="
          () => {
            selectedElement = 'rightTab';
            isSomethingSelected = true;
          }
        "
      />
    </div>
  </div>
</template>
