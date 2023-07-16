import { Room, Client } from '@colyseus/core'
import { RoomState, CONSTANTS } from '@hapi/common'
import { checkAuth, getUser } from '../auth'
import { util } from '@hapi/common'
const F = CONSTANTS.F

export class GameRoom extends Room<RoomState.Game> {
  maxClients = 50

  async onAuth(client: Client, options: any) {
    return checkAuth(options.accessToken)
  }

  onCreate(options: any) {
    this.setState(new RoomState.Game())
    // this.state.cards.push(new RoomState.Card())
    this.onMessage('type', (client, message) => {
      console.log(client.sessionId, message)

      // this.clients.forEach((client) => {
      //   client.send('begin battle', this.state.world)
      // })
      // this.broadcast('aaa', '1111')
      //
      // handle "type" message
      //
    })
  }

  onJoin(client: Client, options: any) {
    const userinfo = getUser(options.accessToken)    
    if (userinfo) {
      userinfo.nickname = util.randomName()
      console.log(`${userinfo.nickname}上线了`)
      client.send(F.G_JOIN, userinfo)
    }
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left! game')
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing... game')
  }

  // handleTick = () => {
  //   console.log('tick')
  //   this.state.update()
  // }
}
