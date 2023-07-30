<script setup lang="ts">
import type { IActor } from '@hapi/common/entities/interface'
import ActorAvator from './ActorAvator.vue'

interface IProps {
  actor: IActor
  size?: string
}

withDefaults(defineProps<IProps>(), {
  size: 'small'
})
</script>

<template>
  <div class="actor">
    <div class="actor-name">{{actor.level}}级 {{ actor.breed.name }}{{ actor.name }}  {{actor.currentHealth == 0 ? `(DEATH)`:''}}</div>
    <ActorAvator :src="actor.media"></ActorAvator>
    <div class="info">
      <div class="actor-hp">
        <div
          class="inner"
          :style="{ width: (actor.currentHealth / actor.maxHealth) * 100 + '%' }"
        ></div>
      </div>
      <!-- <div class="status">
        <div class="buff">
          <img :src="`${IMG_DIR}/status/poison.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/fire.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
        <div class="buff">
          <img :src="`${IMG_DIR}/status/cold.jpg`" alt="" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss">
.actor {
  display: flex;
  flex-direction:column;
  align-items: center;
  .actor-name{
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
  // scale: 72%;
  .info {
    // margin-top: -25px;
    // font-weight: bold;
    color: #eee;
    text-align: left;
  }
  .actor-hp {
    width: 90px;
    height: 10px;
    text-align: center;
    color: #a1a3cc;
    background-color: rgba(0, 0, 0, 0.4);
    // opacity: 0.6;
    .inner {
      height: 100%;
      background: rgba(154, 0, 74, 1);
    }
  }
  .status {
    margin: 7px -5px;
    width: 180px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    .buff {
      width: 24px;
      height: 24px;
      border: 1px solid #a1a3cc;
      margin: 2px;
      // background-color: rgba(0,0,0,0.4);
      cursor: pointer;
      border: 1px solid rgb(161, 163, 204);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
