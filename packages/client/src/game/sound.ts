
import { sound } from '@pixi/sound'

export class GameSound {
  constructor(){
    sound.add('FireBall', 'src/assets/sound/fireball.aac')
    sound.add('death', 'src/assets/sound/death.aac')
  }

  disable = true

  register(name: string, fileName?: string) {
    sound.add(name,`src/assets/sound/${fileName??name}.aac`)
  }

  play(name: string) { 
    if(this.disable)return
    sound.stopAll()
    sound.play(name)
  }
}