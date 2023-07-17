<script setup lang="ts">
import CharacterSelect from './pages/CharacterSelect.vue'
import GamePage from './pages/GamePage.vue'
import { game } from './game'
</script>

<template>
  <CharacterSelect v-if="!game.scene.player.value.userinfo"></CharacterSelect>
  <GamePage v-if="game.scene.player.value.userinfo"></GamePage>
</template>

<style scoped></style>
