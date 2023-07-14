import { Room, Client } from '@colyseus/core'
import { MyRoomState } from './schema/MyRoomState'

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4

  onCreate(options: any) {
    this.setState(new MyRoomState())

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
