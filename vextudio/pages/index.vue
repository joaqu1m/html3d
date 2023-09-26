<script lang="ts" setup>
const myElements = {
    teste: ref<number>(300),
};

const selectedElement = ref<string | null>(null);
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
                if (selectedElement) {
                    myElements['teste'].value -= movementX;
                }
            }
        "
    >
        <Header />
        <div class="grow flex">
            <div
                class="bg-gradient-to-b from-3d-gradient-start to-3d-gradient-end max-w-full max-h-full grow"
            />
            <div
                class="h-full relative bg-secondary-gray"
                :style="{ width: `${myElements['teste'].value}px` }"
            >
                <div
                    class="h-full w-[10px] cursor-col-resize absolute left-[-5px] hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300"
                    @mousedown="selectedElement = 'teste'"
                />
            </div>
        </div>
    </div>
</template>
