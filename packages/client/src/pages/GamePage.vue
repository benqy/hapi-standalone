<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterInvertory from '../components/inventory/CharacterInvertory.vue'
import { createCombatRoom } from '../game/index'

onMounted(() => {
  createCombatRoom()
})
</script>
<template>
  <CharacterInvertory></CharacterInvertory>
  <button>进入战斗房间</button>
</template>
