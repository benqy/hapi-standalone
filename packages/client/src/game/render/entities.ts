import { IMG_DIR } from '@hapi/common/constants'
import type { Character, Enemy } from '@hapi/common/entities'
import type { IActor } from '@hapi/common/entities/interface'
import { Application, Container, Sprite, Assets, Graphics, Text } from 'pixi.js'

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
    this.characterSprite = this.renderActor(character, x, y, { showName: true })
  }

  renderActor(actor: IActor, x: number, y: number, { showName = true } = {}) {
    // const containerSize = 160
    const spriteOffset = 0
    const spriteSize = 120
    const healthBarY = 65
    const healthBarX = -60
    const container = new Container()
    const actorSprite = Sprite.from(actor.media)
    actorSprite.width = 120
    actorSprite.height = 120
    actorSprite.anchor.set(0.5)
    actorSprite.y = spriteOffset
    actorSprite.x = spriteOffset
    // const actorBG = Sprite.from(`${IMG_DIR}/ui/enemy-unique.png`)
    // actorBG.width = 120
    // actorBG.height = 120
    // actorBG.anchor.set(0.5)
    // container.addChild(actorBG)
    // container.height = containerSize
    // container.width = containerSize
    container.x = x
    container.y = y
    // container.pivot.x = this.app.screen.width / 2
    // container.pivot.y = this.app.screen.height - 100
    const mask = new Graphics()
    // Add the rectangular area to show
    mask.beginFill(0xffffff)
    mask.drawRect(-80, -80, 160, 160)
    mask.endFill()
    // container.addChild(mask)
    // container.mask = mask
    //血条背景
    const healthBG = new Graphics()
    // healthBar.beginFill(0xde3249)
    healthBG.beginFill(0x000000)
    healthBG.drawRect(healthBarX, healthBarY, spriteSize, 8)
    healthBG.endFill()
    container.addChild(healthBG)

    //血条
    const healthBar = new Graphics()
    // healthBar.beginFill(0xde3249)
    // healthBar.drawRect(healthBarX, healthBarY, 70, 14)
    // healthBar.endFill()
    container.addChild(healthBar)

    container.addChild(actorSprite)
    // 名称
    if (showName) {
      const text = new Text(`${actor.level}级 一二三四五六七八九十`, {
        fontSize: 12,
        stroke: '#e2a914',
        strokeThickness: 5,
        fill: 0xffffff
      })
      text.anchor.set(0.5)
      text.y = -72
      container.addChild(text)
    }
    this.app.stage.addChild(container)
    console.log(container.getLocalBounds(), 4)
    this.app.ticker.add(() => {
      const currentHealth = Math.floor((actor.currentHealth / actor.maxHealth) * 120)
      healthBar.clear()
      healthBar.beginFill(0xde3249)
      healthBar.drawRect(healthBarX, healthBarY, currentHealth, 8)
      healthBar.endFill()
    })

    return container
  }
}
