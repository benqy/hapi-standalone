export class type {
  [key: string]: Function
}
export class Keybind {
  constructor(public name: string, public binds: type) {
    this.init()
  }
  init() {
    document.addEventListener('keydown', (e) => {
      if (this.binds[e.key.toLocaleLowerCase()]) {
        this.binds[e.key.toLocaleLowerCase()]()
      }
    })
  }
}
