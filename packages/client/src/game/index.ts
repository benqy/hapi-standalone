import * as Colyseus from 'colyseus.js'

const client = new Colyseus.Client('ws://10.5.15.97:2567')

client
  .joinOrCreate('my_room')
  .then((room) => {
    console.log(room.sessionId, 'joined', room.name)
  })
  .catch((e) => {
    console.log('JOIN ERROR', e)
  })
