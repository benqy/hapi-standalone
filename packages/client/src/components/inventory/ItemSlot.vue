<script setup lang="ts">
defineProps<{
  name: string
  item?: string
  // slot: {
  //     type: [Number, String]
  //   },
  //   type: {
  //     type: String,
  //     default: 'item'
  //   },
  //   item: {
  //     type: Object,
  //     default() {
  //       return null
  //     }
  //   }
}>()
</script>
<template>
  <div
    :id="`item-slot-${name}`"
    :class="{ 'item-slot': true, empty: item === null }"
    :data-slot="name"
    :data-type="item === null ? 'empty-slot' : 'item'"
  >
    <div class="content">
      <slot></slot>
      <!-- <div v-if="item" class="itemContent" ref="contentEl">
        <div class="names">
          <p>{{ item.text }}</p>
          <p>{{ $t(item.rarity) }} {{ $t(`equipbase.${item.type}`) }}</p>
          <p>物品等级:{{ item.itLevel }}</p>
        </div>
        ----
        <div class="attr">
          <p v-for="k in item.affixValues" :key="k.id">{{ k.desc }}(Tier: {{ k.tier }})</p>
          <p style="color: saddlebrown; font-weight: 600">🔸 +3 投射物数量</p>
        </div>
        ----
        <div class="desc">
          友谊魔法：超越界限，凝聚友情，激发理解与支持，创造和谐与善良。化解冲突，团结众人，温暖世界。
        </div>
        <div class="meta">
          <p>需求等级:{{ item.reqLevel }}</p>
          <p>可交易</p>
          <p>装备唯一</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style>
.itemContent {
  display: none;
  position: absolute;
  width: 200px;
  background: burlywood;
  padding: 8px;
  border: 3px solid;
  border-color: saddlebrown;
}
.meta {
    padding: 15px 5px 5px 15px;
    p {
      font-size: 12px;
      text-align: right;
    }
  }
.desc {
    font-size: 10px;
    color: #000;
    opacity: 0.7;
    line-height: 1.5;
  }
.attr {
    line-height: 1.5;
  }
.names {
    line-height: 1.5;
    :first-child {
      font-size: 18px;
      font-weight: bold;
      color: saddlebrown;
    }
  }
</style>
