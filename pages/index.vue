<script lang="ts" setup>
import ObjectTree from '~/components/sidebar/ObjectTree.vue';
import PolygonOptions from '~/components/sidebar/PolygonOptions.vue';
import { MainTab } from '~/types';
import AnimationMenu from '~/components/sidebar/AnimationMenu.vue';
import x_icon from '~/assets/icons/x_icon.svg';

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
  heldTab.value.tab = null;
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
  if (heldTab.value.tab) {
    heldTab.value.coords.x = event.x;
    heldTab.value.coords.y = event.y;
  }
};

let selectedElement = ref<MainTab | null>(null);

const heldTab = useHeldTab();

const leftCells = ref([
  {
    tabs: [
      {
        id: 'objecttree',
        title: 'Object Tree',
        component: markRaw(ObjectTree),
      },
    ],
    height: null,
    isLastComponent: null,
  },
  {
    tabs: [
      {
        id: 'polygonoptions',
        title: 'Polygon Options',
        component: markRaw(PolygonOptions),
      },
    ],
    height: null,
    isLastComponent: null,
  },
  {
    tabs: [
      {
        id: 'animationmenu',
        title: 'Animation Menu',
        component: markRaw(AnimationMenu),
      },
    ],
    height: null,
    isLastComponent: null,
  },
]);

provide('mouseMoveEvent', mouseMoveEvent);
provide('deselectEvent', deselectEvent);
</script>

<template>
  <div
    class="w-screen h-screen flex flex-col overflow-hidden"
    :class="isSomethingSelected && 'no-user-select'"
    @mousedown="
      (event) => {
        if (event.button === 2) handleDeselect(event);
      }
    "
    @mousemove="handleMouseMove"
    @mouseup="handleDeselect"
  >
    <div
      v-if="heldTab.tab"
      class="absolute flex flex-col h-[300px] w-[400px] z-50 opacity-50"
      :style="{
        left: heldTab.coords.x + 5 + 'px',
        top: heldTab.coords.y + 5 + 'px',
      }"
    >
      <div class="min-h-[40px] flex overflow-x-hidden">
        <div
          class="bg-menu-black flex items-center justify-center h-full text-primary-white font-medium text-sm px-3 gap-2 min-w-max cursor-pointer select-none"
        >
          {{ heldTab.tab.title }}
          <button>
            <img :src="x_icon" alt="Close Icon" class="w-4" />
          </button>
        </div>
      </div>
      <div class="bg-menu-black min-h-[16px]" />
      <div
        class="flex flex-col h-full w-full overflow-y-hidden p-4 gap-2 bg-secondary-gray"
      >
        <component :is="heldTab.tab.component" />
      </div>
    </div>
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
