import { Room, Client } from '@colyseus/core'
import { RoomState, CONSTANTS } from '@hapi/common'
import { checkAuth, getUser } from '../auth'
import { util } from '@hapi/common'
import { getCharacter } from '../mock'
import { actions } from '../action'
import { Player,GameMap } from '@hapi/common/entities'
import { CombatController } from '../controllers/combat.controller'
import { cache } from '../db/cache'


const F = CONSTANTS.F
export class GameRoom extends Room<RoomState.Game> {
  maxClients = 1
  firstTickExcuted = false
  gameController: CombatController
  async onAuth(client: Client, options: any) {
    if (this.clients.length <= 1) {
      return checkAuth(options.accessToken)
    } else {
      return false
    }
  }

  onCreate(options: any) {
    this.setState(new RoomState.Game())
    this.gameController = new CombatController(this.roomId)
    const map = new GameMap()
    map.name = '森林'
    map.minLv = 1
    map.maxLv = 10

    this.gameController.map = map
    cache.addGameRoom(this)
    // this.state.cards.push(new RoomState.Card())
    this.onMessage(F.G_Start_Combat, (client, message) => {
      this.gameController.stop()
      const res = this.gameController.start(this.state.player.character)
      if(res.code === 200) {
        this.setSimulationInterval((deltaTime) => this.update(deltaTime),300)
      }
      client.send(res.action, res)
    })
  }

  onJoin(client: Client, options: any) {
    const userinfo = getUser(options.accessToken)
    if (userinfo) {
      userinfo.nickname = util.randomName()
      const character = getCharacter()
      character.name = userinfo.nickname
      this.state.player = new Player()
      this.state.player.userinfo = userinfo
      this.state.player.character = character
      this.state.playerId = character.id
      console.log(userinfo.nickname)
      client.send(F.G_Character_Data, character)
    }
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left! game')
  }

  onDispose() {
    console.log(this.roomId, '游戏房间关闭')
    cache.deleteGameRoom(this.roomId)
  }


  update(deltaTime: number) {
    if(this.firstTickExcuted) {
      this.firstTickExcuted = true
      this.firstTick(deltaTime)
    }
    this.beforeTick(deltaTime)
    this.doTick(deltaTime)
    this.afterTick(deltaTime)
  }

  firstTick(deltaTime: number){
    console.log('game loop start')
    // console.log('firstTick',deltaTime)
  }

  beforeTick(deltaTime: number){
    // console.log('beforeTick',deltaTime)
  }

  doTick(deltaTime: number){
    this.gameController.doTick(deltaTime)
    // console.log('doTick',deltaTime)
  }

  afterTick(deltaTime: number){
    // console.log('afterTick',deltaTime)
  }
}
