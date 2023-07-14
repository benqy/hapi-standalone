import { Room, Client } from '@colyseus/core'
import { CombatRoomState } from '@hapi/common'

export class MyRoom extends Room<CombatRoomState> {
  maxClients = 4

  onCreate(options: any) {
    this.setState(new CombatRoomState())

    this.onMessage('type', (client, message) => {
      console.log(client,message)
      //
      // handle "type" message
      //
    })
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, 'joined!')
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left!')
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing...')
  }

  handleTick = () => {
    console.log('tick')
    this.state.update()
  }
}
