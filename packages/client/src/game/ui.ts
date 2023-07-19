import type { JsObject } from '@hapi/common/interfaces'
import { ref } from 'vue'

const state: { [x: string]: any } = {
  inventoryShow: ref(false),
  characterShow: ref(false)
}
export const ui = {
  state,
  togglePad: function (pad: string) {
    this.state[pad].value = !this.state[pad].value
    console.log('togglePad', this.state[pad].value)
  }
}
