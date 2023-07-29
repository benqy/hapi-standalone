// import { IMG_DIR } from '@hapi/common/constants'
import { Skill } from '@hapi/common/entities'

import {
  Application,
  Container,
  Sprite,
  Assets,
  Graphics,
  Text,
  Spritesheet,
  BaseTexture,
  AnimatedSprite
  // Mesh,
  // Shader,
  // Geometry,
  // Texture,
  // RenderTexture
} from 'pixi.js'
import { game } from '../game'
import { fire16 } from './sheet/fire16'

export class SkillRender {
  skillSheets: Map<string, Spritesheet> = new Map()
  constructor(public app: Application<HTMLCanvasElement>) {}
  async exceute(skill: Skill) {
    if (!game.character || !game.scene.mainEnemy.value) return
    let spritesheet: Spritesheet
    if (!this.skillSheets.has(skill.name.toLocaleLowerCase())) {
      spritesheet = new Spritesheet(BaseTexture.from(fire16.meta.image), fire16)
      this.skillSheets.set(skill.name.toLocaleLowerCase(), spritesheet)
      await spritesheet.parse()
    } else {
      spritesheet = this.skillSheets.get(skill.name.toLocaleLowerCase())
    }
    const anim = new AnimatedSprite(spritesheet.animations.fireball)
    anim.x = game.character.renderData.x
    anim.y = game.character.renderData.y
    anim.angle = -90
    anim.anchor.set(0.5)
    anim.animationSpeed = 0.5
    anim.play()
    this.app.stage.addChild(anim)
    const speed = 15
    const enemyRenderData = game.scene.mainEnemy.value.renderData
    const listener = (deltaTime: number) => {
      anim.y -= speed * deltaTime
      if (anim.y <enemyRenderData.y + 120) {
        this.app.ticker.remove(listener)
        anim.destroy()
        enemyRenderData.takeHit = true
      }
    }
    this.app.ticker.add(listener)
    // const bullet = Sprite.from('https://pixijs.com/assets/bunny.png')
  }
}
