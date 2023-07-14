<script setup lang="ts">
import CharacterInvertory from './components/inventory/CharacterInvertory.vue'
import CharacterSelect from './components/CharacterSelect.vue'
import { uiState } from './state/ui'
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
console.log(uiState.state.characterSelectShow.value)
</script>

<template>
  <CharacterSelect v-if="uiState.state.characterSelectShow.value"></CharacterSelect>
  <div class="game" v-else>
    <CharacterInvertory></CharacterInvertory>
  </div>
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
./state/ui-state./state/ui