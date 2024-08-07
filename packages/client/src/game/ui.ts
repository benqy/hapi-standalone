import { ref } from 'vue'

const state: { [x: string]: any } = {
  inventoryShow: ref(false),
  characterShow: ref(false),
  mapShow:ref(false)
}
export const ui = {
  state,
  togglePad: function (pad: string) {
    this.state[pad].value = !this.state[pad].value
  },
}
