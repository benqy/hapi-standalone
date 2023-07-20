import { Room, Client } from '@colyseus/core'
import { RoomState, CONSTANTS } from '@hapi/common'
import { checkAuth, getUser } from '../auth'
import { util } from '@hapi/common'
import { getCharacter } from '../mock'
import { actions } from '../action'
import { Player } from '@hapi/common/entities'
import { CombatController } from '../controllers/combat.controller'

const F = CONSTANTS.F
let gameController:CombatController = new CombatController()
let firstTick = true
export class GameRoom extends Room<RoomState.Game> {
  maxClients = 1

  async onAuth(client: Client, options: any) {
    if (this.clients.length <= 1) {
      return checkAuth(options.accessToken)
    } else {
      return false
    }
  }

  onCreate(options: any) {
    this.setState(new RoomState.Game())
    // this.state.cards.push(new RoomState.Card())
    this.onMessage(F.G_Start_Combat, (client, message) => {
      gameController.stop()
      const res = gameController.start(this.state.player.character)
      if(res.code === 200) {
        this.setSimulationInterval((deltaTime) => this.update(deltaTime),1500)
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
      console.log(this, userinfo.nickname)
      client.send(F.G_Character_Data, character)
    }
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left! game')
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing... game')
  }


  update(deltaTime: number) {
    if(firstTick) {
      firstTick = false
      this.firstTick(deltaTime)
    }
    this.beforeTick(deltaTime)
    this.doTick(deltaTime)
    this.afterTick(deltaTime)
  }

  firstTick(deltaTime: number){
    console.log('game loop start')
    gameController.doTick(deltaTime)
    // console.log('firstTick',deltaTime)
  }

  beforeTick(deltaTime: number){
    // console.log('beforeTick',deltaTime)
  }

  doTick(deltaTime: number){
    // console.log('doTick',deltaTime)
  }

  afterTick(deltaTime: number){
    // console.log('afterTick',deltaTime)
  }
}
