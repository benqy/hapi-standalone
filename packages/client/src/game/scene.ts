import { data, type RoomState } from '@hapi/common'
import { Character, Enemy, GameMap, Player } from '@hapi/common/entities'
import type { IActor } from '@hapi/common/entities/interface'
import type { Room } from 'colyseus.js'
import { ref } from 'vue'
// import { SYSTEM_CONFIG } from './constant'

export class Scene {
  constructor() {}

  owner: Player
  players: Player[] = []
  characters: Character[] = []
  mainEnemy = ref(null as Enemy)
  enemys: Enemy[] = []
  player = ref(new Player())
  level = 1
  inCombat = ref(false)
  room: Room<RoomState.Game> 
  combatMap: GameMap
  maps = data.world1Data.maps as GameMap[]
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
