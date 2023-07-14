import * as Colyseus from 'colyseus.js'
import type { CombatRoomState } from '@hapi/common'

const client = new Colyseus.Client('ws://localhost:2567')

client
  .create<CombatRoomState>('combat_room')
  .then((room) => {
    console.log(room.sessionId, 'joined', room.name)
    room.onMessage('*', (type, message) => {
      console.log(type, message)
    })
    room.send('type', 'client to server message')
  })
  .catch((e) => {
    console.log('JOIN ERROR', e)
  })