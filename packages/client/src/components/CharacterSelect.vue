<script setup lang="ts">
import { loadUserInfo } from '@/game/auth'
import { onMounted } from 'vue'
import { uiState } from '@/state/ui'
import { CONSTANTS, RoomState } from '@hapi/common';

const login = async () => {
  const room = await loadUserInfo()
  if (room) {
    room.onMessage<RoomState.Userinfo>(CONSTANTS.F.AUTH_JOIN, userinfo => {
      console.log('登录成功:',userinfo.nickname)
      room.leave()
      uiState.toggleCharacterSelect()
    })
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
