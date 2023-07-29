import { IMG_DIR } from '@hapi/common/constants'
import type { Character, Enemy } from '@hapi/common/entities'
import type { IActor } from '@hapi/common/entities/interface'
import { Application, Container, Sprite, Assets, Graphics, SimplePlane } from 'pixi.js'

export class entityRender {
  constructor(public app: Application<HTMLCanvasElement>) {}

  mainEnemy: Container
  characterSprite: Container

  renderMainEnemy(enemy: Enemy) {
    if (this.mainEnemy) {
      console.log('remove mainEnemy')
      this.mainEnemy.destroy()
    }
    const x = this.app.screen.width / 2
    const y = 100
    this.mainEnemy = this.renderActor(enemy, x, y)
  }

  death(actorSprite: Container) {
    actorSprite.destroy()
  }

  renderCharacter(character: Character) {
    if (this.characterSprite) {
      console.log('remove characterSprite')
      this.characterSprite.destroy()
    }
    const x = this.app.screen.width / 2
    const y = this.app.screen.height - 100
    this.characterSprite = this.renderActor(character, x, y)
  }

  renderActor(actor: IActor, x: number, y: number) {
    const container = new Container()
    const actorSprite = Sprite.from(actor.media)
    actorSprite.width = 115
    actorSprite.height = 115
    actorSprite.anchor.set(0.5)
    actorSprite.y = -6
    const actorBG = Sprite.from(`${IMG_DIR}/ui/enemy-unique.png`)
    actorBG.width = 120
    actorBG.height = 120
    actorBG.anchor.set(0.5)
    container.x = x
    container.y = y
    // container.pivot.x = this.app.screen.width / 2
    // container.pivot.y = this.app.screen.height - 100
    const mask = new Graphics()
    // Add the rectangular area to show
    mask.beginFill(0xffffff)
    mask.drawRect(-60, -60, 120, 120)
    mask.endFill()
    // container.addChild(mask)b
    // container.mask = mask
    //血条背景
    const healthBG = new Graphics()
    // healthBar.beginFill(0xde3249)
    healthBG.beginFill(0x000000)
    healthBG.drawRect(-60, 55, 120, 10)
    healthBG.endFill()
    container.addChild(healthBG)

    //血条
    const healthBar = new Graphics()
    healthBar.beginFill(0xde3249)
    healthBar.drawRect(-60, 55, 70, 10)
    healthBar.endFill()
    container.addChild(healthBar)

    // container.addChild(actorBG)
    container.addChild(actorSprite)
    this.app.stage.addChild(container)
    this.app.ticker.add(() => {
      const currentHealth = Math.floor((actor.currentHealth / actor.maxHealth) * 120)
      healthBar.clear()
      healthBar.beginFill(0xde3249)
      healthBar.drawRect(-60, 55, currentHealth, 10)
      healthBar.endFill()
      // healthBar.width = 
    })

    return container
  }
}
