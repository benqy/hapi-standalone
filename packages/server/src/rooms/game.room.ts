import { Room, Client } from '@colyseus/core'
import { RoomState, CONSTANTS } from '@hapi/common'
import { checkAuth, getUser } from '../auth'
import { util } from '@hapi/common'
import { getCharacter, getMaps } from '../mock'
import { Player,GameMap } from '@hapi/common/entities'
import { CombatController } from '../controllers/combat.controller'
import { cache } from '../db/cache'


const F = CONSTANTS.F
export class GameRoom extends Room<RoomState.Game> {
  maxClients = 1
  firstTickExcuted = false
  gameController: CombatController
  token:string
  ownerCharacterId:string

  static sendToOwner<T>(characterId:string,type:string,data:T){
    const room = cache.getRoomByCharacterId(characterId)
    room.sendToOwner(type,data)
  }

  sendToOwner<T>(type:string,data:T){
    const client = this.clients[0]
    if(client) {
      client.send(type, data)
    }
  }

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
    // const map = new GameMap()
    // map.group = MapGroup.sea
    // map.name = '旺比森林'
    // map.minLv = 70
    // map.maxLv = 80

    cache.addGameRoom(this)
    // this.state.cards.push(new RoomState.Card())
    this.onMessage<GameMap>(F.G_Start_Combat, (client, mapId) => {
      this.gameController.stop()
      const map = getMaps().find((m) => m.id === mapId.toString())
      if(map != null) {
        this.gameController.map = map
        const res = this.gameController.start(this.state.player.character)
        if(res.code === 200) {
          this.setSimulationInterval((deltaTime) => this.update(deltaTime),50)
        }
        client.send(res.action, res)
      }
    })
  }

  onJoin(client: Client, options: any) {
    const userinfo = getUser(options.accessToken)
    if (userinfo) {
      this.token = options.accessToken
      userinfo.nickname = util.randomName()
      const character = getCharacter()
      this.ownerCharacterId = character.id
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
