// import { IMG_DIR } from '@hapi/common/constants'
import { Skill } from '@hapi/common/entities'

import {
  Application,
  Spritesheet,
  BaseTexture,
  AnimatedSprite
} from 'pixi.js'
import { game } from '../game'
// import { fire16 } from './sheet/fire16'
import { boltBlue } from './sheet/bolt-blue'

export class SkillRender {
  skillSheets: Map<string, Spritesheet> = new Map()
  constructor(public app: Application<HTMLCanvasElement>) {}
  async exceute(skill: Skill) {
    if (!game.character || !game.scene.mainEnemy.value) return
    let spritesheet: Spritesheet
    if (!this.skillSheets.has(skill.name.toLocaleLowerCase())) {
      spritesheet = new Spritesheet(BaseTexture.from(boltBlue.meta.image), boltBlue)
      this.skillSheets.set(skill.name.toLocaleLowerCase(), spritesheet)
      await spritesheet.parse()
    } else {
      spritesheet = this.skillSheets.get(skill.name.toLocaleLowerCase())
    }
    const anim = new AnimatedSprite(spritesheet.animations.fireball)
    anim.x = game.character.renderData.x
    anim.y = game.character.renderData.y
    anim.angle = 90
    anim.anchor.set(0.5)
    anim.animationSpeed = 0.5
    anim.play()
    this.app.stage.addChild(anim)
    const enemyRenderData = game.scene.mainEnemy.value.renderData
    const y1 = enemyRenderData.y + 120
    const distance = Math.abs(y1 - anim.y)
    const speed = distance / skill.actionTime
    console.log('fire')
    // const speed = (1000/this.app.ticker.speed)
    const listener = () => {
      anim.y -= speed * this.app.ticker.deltaMS
      if (anim.y < y1) {
        this.app.ticker.remove(listener)
        anim.destroy()
        enemyRenderData.takeHit = true
        console.log('hit')
      }
    }
    
    this.app.ticker.add(listener)
    // const bullet = Sprite.from('https://pixijs.com/assets/bunny.png')
  }
}
