import { Keybind } from './keybind'
import { ui } from './ui'
export *  from '@hapi/common/constants';

export * from './game'
export { ui } from './ui'

 

new Keybind('keyboard', {
  b: () => {
    ui.togglePad('inventoryShow')
  },
  c: () => {
    ui.togglePad('characterShow')
  }
})
