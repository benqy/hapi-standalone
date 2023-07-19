<script setup lang="ts">
import { game } from '@/game'
import ItemSlot from './inventory/ItemSlot.vue'
const equippad = game.character.equipped
</script>
<template>
  <div class="character-wrap">
    <div class="character-bg">
      <img src="/src/assets/img/enemy/23.jpg" alt="" />
    </div>
    <div className="character" ref="character">
      <!-- <ItemSlot
        v-for="(equipslot, item) in equippad.equipments"
        class="character-item"
        :key="item.id"
        :class="`character-${i} character-item-${sorts[i]}`"
        :slot="i"
        :item="item"
      >
        <img
          v-if="item"
          class="slot-item"
          :src="`/src/assets/img/items/equipment/${item.type}/${item.name}.webp`"
        />
      </ItemSlot> -->
    </div>
  </div>
</template>
<style>
.character-wrap {
  z-index: 1000;
  grid-area: 2/1/4/3;
  justify-self: center;
  align-self: end;
  height: 686px;
  width: 502px;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: 90px repeat(6, 1fr) 90px;
}

.character-bg,
.character-bg img {
  grid-area: 1/1/9/9;
  height: 686px;
  width: 502px;
}

.character {
  grid-area: 1/1/9/9;
  justify-self: center;
  align-self: center;
  height: 686px;
  width: 502px;
  background: transparent url('/src/assets/img/ui/20.png') no-repeat;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: 90px repeat(6, 1fr) 90px;
}

.character-item-left {
  justify-self: end;
  align-self: center;
  background-size: cover;
}

.character-item-right {
  justify-self: start;
  align-self: center;
  background-size: cover;
}

.character-helment {
  grid-area: 2/1/3/2;
  background-image: url('/src/assets/img/ui/helment.png');
  background-repeat: no-repeat;
}

.character-shoulder {
  grid-area: 3/1/4/2;
  background-image: url('/src/assets/img/ui/shoulder.png');
  background-repeat: no-repeat;
}
.character-body {
  grid-area: 4/1/5/2;
  background-image: url('/src/assets/img/ui/body.png');
  background-repeat: no-repeat;
}
.character-glove {
  grid-area: 5/1/6/2;
  background-image: url('/src/assets/img/ui/glove.png');
  background-repeat: no-repeat;
}
.character-ring1 {
  grid-area: 6/1/7/2;
  background-image: url('/src/assets/img/ui/ring.png');
  background-repeat: no-repeat;
}
.character-weapon1 {
  grid-area: 6/4/7/2;
  background-image: url('/src/assets/img/ui/weapon1.png');
  background-repeat: no-repeat;
}

.character-amulet {
  grid-area: 2/8/3/9;
  background-image: url('/src/assets/img/ui/amulet.png');
  background-repeat: no-repeat;
}

.character-belt {
  grid-area: 3/8/4/9;
  background-image: url('/src/assets/img/ui/belt.png');
  background-repeat: no-repeat;
}
.character-trousers {
  grid-area: 4/8/5/9;
  background-image: url('/src/assets/img/ui/trousers.png');
  background-repeat: no-repeat;
}
.character-boot {
  grid-area: 5/8/6/9;
  background-image: url('/src/assets/img/ui/boot.png');
  background-repeat: no-repeat;
}
.character-ring2 {
  grid-area: 6/8/7/9;
  background-image: url('/src/assets/img/ui/ring.png');
  background-repeat: no-repeat;
}

.character-weapon2 {
  grid-area: 6/6/7/7;
  background-image: url('/src/assets/img/ui/weapon2.png');
  background-repeat: no-repeat;
}
</style>
