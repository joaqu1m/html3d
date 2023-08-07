<template>
	<div id="app">
		<p class="text-[#010101]">Copos: {{ cupsOfWater }}</p>
		<p class="text-[#010101]">Último copo: {{ lastCup }}</p>
		<button class="bg-black text-white" @click="drinkCup">Beber um copo</button>
	</div>
</template>
<script lang="ts">
export default {
	setup() {
		const cupsOfWater: globalThis.Ref<number> = ref(0);
		const lastCup: globalThis.Ref<Date> = ref(new Date());
		
		function drinkCup(): void {
			cupsOfWater.value++
			lastCup.value = new Date()
		}

		return {
			cupsOfWater,
			lastCup,
			drinkCup
		}
	}
}
</script>
