<script setup lang="ts">
import { loadUserInfo } from '@/game/auth'
import { onMounted } from 'vue'
import { uiState } from '@/state/ui'

const login = async () => {
  const res = await loadUserInfo()
  if (res) {
    // console.log('登录成功')
    uiState.toggleCharacterSelect()
  }
}

onMounted(() => {
  login() //调试
})
</script>

<template>
  <div class="character-select">
    <button @click="login">点击模拟登录</button>
  </div>
</template>

<style scoped></style>
