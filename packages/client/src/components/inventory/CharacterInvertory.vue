<script setup lang="ts">
import type { Intenvory } from '@hapi/common/entities/inventory'
import ItemSlot from './ItemSlot.vue'

// import { ui } from '@/lib/ui'
const props = defineProps<{
  inventory: Intenvory
}>()
console.log(JSON.stringify(props.inventory), 4)
</script>

<template>
  <div className="inventory">
    <!-- <ItemSlot
      v-for="(item,key) in inventory.items"
      :key="key"
      :item="inventory.items[key]"
      :name="`inventory-${key}`"
    > -->
      <!-- <img
        v-if="item"
        class="slot-item"
        :src="`/static/game/items/${item.category}/${item.type}/${item.name}.webp`"
      /> -->
    <!-- </ItemSlot> -->
  </div>
</template>

<style scoped>
.inventory {
  z-index: 1000;
  grid-area: 2/5/4/7;
  justify-self: stretch;
  align-self: end;
  height: 676px;
  width: 578px;
  background: rgba(255, 255, 255, 0.03);
  border: solid 1px rgba(255, 255, 255, 0.09);
  border-radius: 6px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  .being-moved img,
  .being-moved .itemContent {
    display: none;
  }
}

/*物品栏*/
.item-slot {
  display: inline-block;
  height: 48px;
  width: 48px;
  box-sizing: border-box;
  cursor: pointer;
  background: url('@/assets/img/ui/23.png') no-repeat;
  background-size: contain;
  padding: 2px;
  &:hover .itemContent {
    display: block;
  }
}

.item-slot.empty {
  cursor: default;
}

.item-slot.being-dragged {
  position: absolute;
  cursor: grab;
}

.item-slot.being-dragged .content {
  background: rgba(255, 255, 255, 0.4);
}

.item-slot .content {
  background: rgba(255, 255, 255, 0.09);
  border: solid 1px rgba(255, 255, 255, 0.03);
  width: 100%;
  height: 100%;
  border-radius: 3px;
  pointer-events: none;
}

.item-slot .content .slot-item {
  height: 100%;
  width: 100%;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
