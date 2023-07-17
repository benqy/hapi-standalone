import { ref } from 'vue'
import { Room } from './room'
import { Player } from '@hapi/common/entities'
export const game = {
  room: ref(new Room(new Player()))
}
