<script setup lang="ts">
import { IMG_DIR } from '@/game'

interface IProps {
  size: string
  src: string
}

withDefaults(defineProps<IProps>(), {
  size: '100px',
  src: `${IMG_DIR}/enemy/bug.webp`
})
</script>
<template>
  <div class="actor-avator">
    <img :src="src" alt="" />
  </div>
</template>

<style lang="scss">
.actor-avator {
  transform: rotate(45deg);
  background: #eee;
  height: v-bind(size);
  width: v-bind(size);
  border: 5px solid rgb(161, 163, 204);
  text-align: center;
  // opacity: 0.9;
  img {
    width: 100%;
    height: 100%;
    transform: rotate(-45deg);
  }
}
</style>
