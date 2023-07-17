import { Character, Player } from '@hapi/common/entities'
// import { SYSTEM_CONFIG } from './constant'
import { ref } from 'vue'

export class Room {
  constructor() {}

  players: Player[] = []
  characters: Character[] = []
  selfPlayer?: Player
  selfCharacter:any = null

  enemys = []

  owner = null
  level = 1

  // #combatTimer = null

  // #isPause = false
  // get isPause() {
  //   return this.#isPause
  // }

  // addPlayer(player) {
  //   if (this.players.length <= this.maxPlayer) {
  //     if (this.players.length === 0) {
  //       //创建房间的玩家
  //       this.owner = player
  //     }
  //     this.players.push(player)
  //   }
  // }

  // removePlayer(player) {
  //   this.players = this.players.filter((p) => p.id !== player.id)
  //   if (this.players.length === 0) {
  //     this.destory()
  //   }
  // }

  // pause() {
  //   this.#isPause = true
  // }

  // startCombat() {
  //   if (this.enemys.length === 0) {
  //     this.spawnEnemy()
  //   }
  //   this.update()
  // }

  // update() {
  //   this.#combatTimer = setInterval(() => {
  //     // this.enemys.forEach((enemy) => {
  //     //   enemy.update()
  //     // })
  //     this.players.forEach((player) => {
  //       player.onlineCharacter.doCombatTick()
  //     })
  //   }, SYSTEM_CONFIG.combatFrameTime)
  // }

  // destory() {
  //   clearInterval(this.#combatTimer)

  // }
}
