<script setup lang="ts">
import { ui } from '@/game';
const toggleCharacterPad = () => {
  ui.togglePad('characterShow')
}

const toggleInventoryPad = () => {
  ui.togglePad('inventoryShow')
}

const temp = () => {
  alert('没呢')
}

</script>
<template>
  <div class="game-display">
    <div class="game-options-selector">
      <a class="btn-tab" :class="{'btn-tab-active': ui.state.characterShow.value}" @click="toggleCharacterPad"> 装备(C) </a>
      <a class="btn-tab" :class="{'btn-tab-active': ui.state.inventoryShow.value}" @click="toggleInventoryPad">物品栏(B)</a>
      <a class="btn-tab">战斗(M)</a>
      <a class="btn-tab"  @click="temp">地图(M)</a>
      <a class="btn-tab"  @click="temp">资源(L)</a>
      <a class="btn-go-hunt" @click="temp">垃圾场(T)</a>
    </div>
  </div>
</template>

<style lang="scss">
.game-display {
  color: $main-color;
  grid-area: 1/1/2/7;
}
/*row-start/column-start/row-end/column-end:*/
/*Game column */
.game-options-selector {
  position: fixed;
  width: 800px;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn-tab {
  border: none;
  background: none;
  font-family: inherit;
  color: #ccc;
  height: 100%;
  font-size: 1.5rem;
  margin-right: 1px;
  padding: 0.3rem 1.3rem;
  opacity: 0.5;
  cursor: pointer;
}
.btn-tab-active {
  opacity: 1;
  color: #226699;
}
.btn-tab:hover {
  opacity: 1;
}

.btn-go-hunt {
  border: none;
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: 800;
  border-radius: 10px;
  padding: 0.3rem 1.3rem;
  background: linear-gradient(90deg, #226699, #3c3c44);
  color: #b3b3cc;
  cursor: pointer;
  font-family: 'Caesar Dressing', sans-serif;
}
</style>
