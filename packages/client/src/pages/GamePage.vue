<script setup lang="ts">
import { onMounted } from 'vue'
import WorldMap from '@/components/map/WorldMap.vue'
// import CombantRoom from '@/components/CombantRoom.vue'
import CharacterPad from '@/components/CharacterPad.vue'
import CharacterInvertory from '../components/inventory/CharacterInvertory.vue'
import { game, ui } from '../game/index'

const player = game.scene.player

onMounted(() => {
  game.enterRoom()
})
</script>
<template>
  <div class="game" v-if="player.character">
    <!-- <CombantRoom v-if="game.scene.inCombat.value"></CombantRoom> -->
    <div class="combat-scene"></div>
    <WorldMap v-if="ui.state.mapShow.value"></WorldMap>
    <CharacterPad v-if="ui.state.characterShow.value"></CharacterPad>
    <CharacterInvertory
      v-if="ui.state.inventoryShow.value"
      :inventory="player.character.inventory"
    ></CharacterInvertory>
  </div>
</template>
<style lang="scss">
.combat-scene{
  grid-area: 2/2/4/6;
  justify-self: center;
  align-self: end;
  width: 1200px;
  background: transparent;
  height: 800px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  canvas {
    grid-area: 1/1/2/2;
  }
}
  
</style>
