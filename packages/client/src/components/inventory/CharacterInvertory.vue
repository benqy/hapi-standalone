<script setup lang="ts">
import type { Intenvory } from '@hapi/common/entities/inventory'
import ItemSlot from './ItemSlot.vue'
import { game } from '@/game/index'
defineProps<{
  inventory: Intenvory
}>()
</script>

<template>
  <div className="inventory">
    <ItemSlot
      v-for="(item, key) in inventory.items"
      :id="key.toString()"
      :key="key"
      :item="inventory.items[key]"
    >
      <img v-if="item" class="slot-item" :src="game.c.item.getMedia(item)" />
    </ItemSlot>
  </div>
</template>

<style scoped>
.inventory {
  z-index: 1000;
  grid-area: 2/5/4/7;
  justify-self: stretch;
  align-self: end;
  height: 682px;
  width: 586px;
  background: rgba(255, 255, 255, 0.03);
  border: solid 1px rgba(255, 255, 255, 0.09);
  border-radius: 6px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
}
.being-moved img,
.being-moved .itemContent {
  display: none;
}

/*物品栏*/

</style>
