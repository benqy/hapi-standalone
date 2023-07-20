<script setup lang="ts">
import type { IActor } from '@hapi/common/entities/interface'
import ActorAvator from './ActorAvator.vue'
import { IMG_DIR } from '@hapi/common/constants'

interface IProps {
  actor: IActor
  size: string
}

withDefaults(defineProps<IProps>(), {
  size: 'small'
})
</script>

<template>
  <div class="actor">
    <ActorAvator :src="actor.media" :size="size"></ActorAvator>
    <div class="info">
      <div class="actor-name">100级 大保健箱</div>
      <div class="actor-hp">
        <div
          class="inner"
          :style="{ width: (actor.currentHealth / actor.maxHealth) * 100 + '%' }"
        ></div>
      </div>
      <div class="actor-action">
        <div
          class="inner"
          :style="{ width: (actor.currentHealth / actor.maxHealth) * 100 + '%' }"
        ></div>
      </div>
      <div class="status">
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
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.actor {
  display: flex;
  scale: 72%;
  .info {
    margin-top: -25px;
    font-weight: bold;
    color: #eee;
    text-align: left;
  }
  .actor-hp {
    width: 200px;
    height: 18px;
    margin-top: 9px;
    margin-left: -33px;
    text-align: center;
    color: #a1a3cc;
    background-color: rgba(0, 0, 0, 0.4);
    // opacity: 0.6;
    border: 3px solid rgb(161, 163, 204);
    .inner {
      height: 18px;
      background: rgba(154, 0, 74, 1);
    }
  }

  .actor-action {
    width: 160px;
    height: 18px;
    margin-top: 14px;
    margin-left: 7px;
    text-align: center;
    color: #a1a3cc;
    background-color: rgba(0, 0, 0, 0.4);
    // opacity: 0.6;
    border: 3px solid rgb(161, 163, 204);
    .inner {
      height: 18px;
      background: rgba(0, 101, 139);
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
