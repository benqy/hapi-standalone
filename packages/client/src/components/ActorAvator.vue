<script setup lang="ts">
import { IMG_DIR } from '@/game'

interface IProps {
  size?: string
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
  // transform: rotate(45deg);
  // background: transparent;
  height: v-bind(size);
  width: v-bind(size);
  background:transparent url("/src/assets/img/ui/enemy-rare.png") no-repeat;  
  background-size: 100%;
  // border: 5px solid rgb(161, 163, 204);
  text-align: center;
  // opacity: 0.9;
  img {
    width: 95%;
    height: 95%;
    margin-top: -5px;
    // transform: rotate(-45deg);
  }
}
</style>
