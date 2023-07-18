<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterInvertory from '../components/inventory/CharacterInvertory.vue'
import { game } from '../game/index'

const player = game.scene.player


onMounted(() => {
  game.enterRoom()
})

</script>
<template>
  <div class="game">
    <CharacterInvertory v-if="player.character" :inventory="player.character.inventory"></CharacterInvertory>
  </div>
</template>
