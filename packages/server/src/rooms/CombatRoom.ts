import { Room, Client } from '@colyseus/core'
import { MyRoomState } from './schema/MyRoomState'

export class CombatRoom extends Room<MyRoomState> {
  maxClients = 3

  onCreate(options: any) {
    this.setState(new MyRoomState())
    this.onMessage('type', (client, message) => {
      console.log(client.sessionId,message)
      
      this.clients.forEach((client) => {
        client.send('begin battle','agggwgwg')
      })
      this.broadcast('aaa', '1111')
      //
      // handle "type" message
      //
    })
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, 'joined! combat')
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, 'left! combat')
  }

  onDispose() {
    console.log('room', this.roomId, 'disposing... combat')
  }

  handleTick = () => {
    console.log('tick')
    this.state.update()
  }
}
