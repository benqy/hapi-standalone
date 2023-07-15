import { Room, Client } from '@colyseus/core'
import { RoomState } from '@hapi/common'
import { checkAuth, getUser } from '../auth'

export class GameRoom extends Room<RoomState.Game> {
  maxClients = 30

  async onAuth(client: Client, options: any) {
    return checkAuth(options.accessToken)
  }

  onCreate(options: any) {
    this.setState(new RoomState.Game())
    this.onMessage('type', (client, message) => {
      console.log(client.sessionId, message)

      this.clients.forEach((client) => {
        client.send('begin battle', this.state.world)
      })
      this.broadcast('aaa', '1111')
      //
      // handle "type" message
      //
    })
  }

  onJoin(client: Client, options: any) {
    console.log(options,444)
    const userinfo = getUser(options.accessToken)
    console.log(client.sessionId, 'joined! game', userinfo)
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left! game')
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing... game')
  }

  handleTick = () => {
    console.log('tick')
    this.state.update()
  }
}
