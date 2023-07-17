<script setup lang="ts">
import CharacterSelect from './pages/CharacterSelect.vue'
import GamePage from './pages/GamePage.vue'
import { game } from './game';
console.log(game.room.value.player.userinfo)
</script>

<template>
  <CharacterSelect v-if="!game.room.value.player.userinfo"></CharacterSelect>
  <GamePage v-if="!game.room.value.player.character"></GamePage>
</template>

<style scoped></style>
