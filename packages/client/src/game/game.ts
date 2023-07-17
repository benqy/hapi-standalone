import { ref } from 'vue'
import { Room } from './room'
export const game = {
  room: ref(new Room())
}