<script setup lang="ts">
import { loadUserInfo } from '@/game/auth'
import { onMounted } from 'vue'

const login = async () => {
  await loadUserInfo()
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
