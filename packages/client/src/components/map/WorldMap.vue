<script setup lang="ts">
import { GameMap } from '@hapi/common/entities'
import { game } from '@/game'
const startCombat = (map: GameMap) => {
  game.startCombat(map)
}
</script>
<template>
  <div class="worldmap">
    <div
      class="dungeon"
      :class="`dungeon${i}`"
      :style="{ 'grid-row-start': map.x, 'grid-column-start': map.y }"
      v-for="(map, i) in game.scene.maps"
      :key="map.id"
      @click="startCombat(map)"
    ></div>
  </div>
</template>
<style scoped lang="scss">
.worldmap {
  grid-area: 2/2/4/6;
  justify-self: left;
  align-self: flex-start;
  height: 800px;
  width: 1280px;
  display: grid;
  grid-template-rows: repeat(20, 1fr);
  grid-template-columns: repeat(20, 1fr);
  background: url('/src/assets/img/map/world1.png') no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1100;
  border: 5px solid $unique;
}

.dungeon {
  width: 30px;
  height: 30px;
  background: url('/src/assets/img/map/dungeon.png') no-repeat;
  background-size: cover;
  cursor: pointer;
}
</style>
