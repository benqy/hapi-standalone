<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterInvertory from '../components/inventory/CharacterInvertory.vue'
import { enterGame, game } from '../game/index'

const player = game.scene.player


onMounted(() => {
  enterGame()
})

</script>
<template>
  <div class="game">
    <CharacterInvertory v-if="player.character" :inventory="player.character.inventory"></CharacterInvertory>
  </div>
</template>
