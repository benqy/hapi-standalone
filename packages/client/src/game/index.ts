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

export const enterGame = async () => {
  const client = new Client(CONSTANTS.SOCKET_URL)
  const room = await client.joinOrCreate<RoomState.Game>(CONSTANTS.ROOM_GAME, {
    accessToken: getAccessToken()
  })
  room.send('type', 'client to server message')
  room.onStateChange((state) => {
    console.log('onStateChange', state)
  })
  room.onMessage('*', (type, message) => {
    switch (type) {
      case CONSTANTS.F.G_JOIN:
        console.log('加入游戏房间成功',message)
        break
      default:
        break
    }
  })
  console.log('game', room)
}
