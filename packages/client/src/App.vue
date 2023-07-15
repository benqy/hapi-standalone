<script setup lang="ts">
import CharacterSelect from './components/CharacterSelect.vue'
import GamePage from './pages/GamePage.vue'
import { uiState } from './state/ui'
</script>

<template>
  <CharacterSelect v-if="uiState.state.characterSelectShow.value"></CharacterSelect>
  <GamePage v-else></GamePage>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="中文中文中文!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
</template>

<style scoped></style>