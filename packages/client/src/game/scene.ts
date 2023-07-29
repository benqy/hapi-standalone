import { data, type RoomState } from '@hapi/common'
import { Character, Enemy, GameMap, Player } from '@hapi/common/entities'
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
}
