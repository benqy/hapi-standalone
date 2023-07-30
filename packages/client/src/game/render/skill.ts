// import { IMG_DIR } from '@hapi/common/constants'
import { Skill } from '@hapi/common/entities'
import type { IActor } from '@hapi/common/entities/interface'

import { Application, Spritesheet, BaseTexture, AnimatedSprite } from 'pixi.js'
import { game } from '../game'
// import { fire16 } from './sheet/fire16'
import { boltBlue } from './sheet/bolt-blue'

export class SkillRender {
  skillSheets: Map<string, Spritesheet> = new Map()
  constructor(public app: Application<HTMLCanvasElement>) {}

  async getSkillSheet(name: string) {
    let spritesheet: Spritesheet
    if (!this.skillSheets.has(name)) {
      spritesheet = new Spritesheet(BaseTexture.from(boltBlue.meta.image), boltBlue)
      this.skillSheets.set(name, spritesheet)
      await spritesheet.parse()
    } else {
      spritesheet = this.skillSheets.get(name)
    }
    return spritesheet
  }

  async exceute(skill: Skill, caster: IActor, target: IActor) {
    const spritesheet = await this.getSkillSheet(skill.name.toLocaleLowerCase())
    const anim = new AnimatedSprite(spritesheet.animations[skill.name.toLocaleLowerCase()])
    anim.x = caster.renderData.x
    anim.y = caster.renderData.y
    anim.angle = caster.renderData.y > target.renderData.y ? 90 : -90
    anim.anchor.set(0.5)
    anim.animationSpeed = 0.5
    anim.play()
    this.app.stage.addChild(anim)
    const distance = target.renderData.y - caster.renderData.y
    const speed = distance / skill.actionTime
    console.log(distance, speed)
    const listener = () => {
      anim.y += speed * this.app.ticker.deltaMS
      if (Math.abs(target.renderData.y - anim.y) <= 60) {
        this.app.ticker.remove(listener)
        anim.destroy()
        target.renderData.takeHit = true
      }
    }

    this.app.ticker.add(listener)
    // const bullet = Sprite.from('https://pixijs.com/assets/bunny.png')
  }
}
