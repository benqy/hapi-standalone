<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterInvertory from '../components/inventory/CharacterInvertory.vue'
import { enterGame, game } from '../game/index'



onMounted(() => {
  enterGame()
})

</script>
<template>
  <div class="game">
    <CharacterInvertory></CharacterInvertory>
  </div>
</template>
