<template>
    <div>
        <p>Home</p>
        <input type="text" @change="mostrar" ref="ap">
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ap: globalThis.Ref<number> = ref(0);

const mostrar = () => {
    console.log(ap);
};
</script>
