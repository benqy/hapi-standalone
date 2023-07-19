<script setup lang="ts">
import ActorInfo from './ActorInfo.vue'
import { game } from '@/game'
</script>
<template>
  <div class="battle-wrap">
    <div class="battle-bg" ref="battleBG"></div>
    <div class="battle-area">
      <div class="enemy">
        <div class="battle-row boss">
          <ActorInfo :actor="game.scene.mainEnemy"></ActorInfo>
        </div>
        <div class="battle-row common">
          <!-- <ActorInfo
            :actor="{
              media: '/static/game/enemy/12.webp',
              maxHealth: 100,
              currentHealth: 90
            }"
          ></ActorInfo>
          >
          <ActorInfo
            :actor="{
              media: '/static/game/enemy/12.webp',
              maxHealth: 100,
              currentHealth: 90
            }"
          ></ActorInfo>
          >
          <ActorInfo
            :unit="{
              media: '/static/game/enemy/12.webp',
              maxHealth: 100,
              currentHealth: 90
            }"
          ></ActorInfo> -->
        </div>
      </div>
      <div class="arena"></div>
      <div class="player">
        <div class="battle-row summon">
          <!-- <ActorInfo
            :unit="{
              media: '/static/game/enemy/101.webp',
              maxHealth: 100,
              currentHealth: 90
            }"
          ></ActorInfo>
          >
          <ActorInfo
            :unit="{
              media: '/static/game/enemy/102.webp',
              maxHealth: 100,
              currentHealth: 90
            }"
          ></ActorInfo> -->
        </div>
        <div class="battle-row player">
          <ActorInfo :actor="game.character"></ActorInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.battle-wrap {
  grid-area: 2/2/4/6;
  justify-self: center;
  align-self: end;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}

.battle-bg {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  grid-area: 1/1/2/2;
  height: 100%;
  width: 100%;
  // background: url('/static/game/bg/battle1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

canvas {
  grid-area: 1/1/2/2;
}

.battle-area {
  grid-area: 1/1/2/2;
  justify-self: center;
  align-self: center;
  height: calc(100% - 10px);
  width: 100%;
  /*background: transparent url('/static/game/ui/20.png') no-repeat ;*/
  background-size: 100% 100%;
  border: 5px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .enemy,
  .player {
    height: 40%;
    .battle-row {
      display: flex;
      height: 50%;
      flex-direction: row;
      flex-wrap: wrap-reverse;
      align-content: flex-start;
      justify-content: space-around;
    }
  }
}
</style>
