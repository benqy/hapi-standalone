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
    <CharacterInvertory v-if="game.room.selfCharacter.value"></CharacterInvertory>
    <div v-if="game.room.selfCharacter">wgwglwlgjw</div>
  </div>
</template>
