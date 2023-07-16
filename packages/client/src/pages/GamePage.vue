<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterInvertory from '../components/inventory/CharacterInvertory.vue'
import { enterGame } from '../game/index'

onMounted(() => {
  enterGame()
})
</script>
<template>
  <CharacterInvertory></CharacterInvertory>
  <button>掉落装备</button>
</template>
