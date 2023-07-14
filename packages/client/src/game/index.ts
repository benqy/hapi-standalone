import { Client } from 'colyseus.js'
import { RoomState, CONSTANTS } from '@hapi/common'
import { getAccessToken } from '@/utils'

// const client = new Colyseus.Client('ws://localhost:2567')

// client
//   .create<RoomState.CombatRoomState>('combat_room')
//   .then((room) => {
//     console.log(room.sessionId, 'joined', room.name)
//     room.onMessage('*', (type, message) => {
//       console.log(type, message)
//     })
//     room.send('type', 'client to server message')
//   })
//   .catch((e) => {
//     console.log('JOIN ERROR', e)
//   })

export const createCombatRoom = async () => {
  const client = new Client(CONSTANTS.SOCKET_URL)
  try {
    const res = await client.joinOrCreate<RoomState.UserRoomState>('combat_room',{
      accessToken: getAccessToken()
    })
    console.log('combat', res)
    return res
  } catch (ex: any) {
    console.dir(ex)
  }
}
