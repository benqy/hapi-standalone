<script setup lang="ts">
import { onMounted } from 'vue'
import CharacterPad from '@/components/CharacterPad.vue';
import CharacterInvertory from '../components/inventory/CharacterInvertory.vue'
import { game, ui } from '../game/index'


const player = game.scene.player


onMounted(() => {
  game.enterRoom()
})

</script>
<template>
  <div class="game" v-if="player.character">
    <CharacterPad v-if="ui.state.characterShow.value"></CharacterPad>
    <CharacterInvertory v-if="ui.state.inventoryShow.value" :inventory="player.character.inventory"></CharacterInvertory>
  </div>
</template>
