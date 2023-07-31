// import { IMG_DIR } from '@hapi/common/constants'
import type { Character, Enemy } from '@hapi/common/entities'
import type { IActor } from '@hapi/common/entities/interface'
import { Application, Container, Sprite, Graphics, Text } from 'pixi.js'
import { waterShader } from './shader'
import { RenderData } from '@hapi/common/data/render-data'
import {ShockwaveFilter} from '@pixi/filter-shockwave'
import { game } from '../game'

export class EntityRender {
  constructor(public app: Application<HTMLCanvasElement>) {}

  mainEnemy: Container
  characterSprite: Container

  renderMainEnemy(enemy: Enemy) {
    if (this.mainEnemy) {
      this.mainEnemy.destroy()
    }
    const x = this.app.screen.width / 2
    const y = 100
    this.mainEnemy = this.renderActor(enemy, x, y, {
      showName: true,
      name: game.lang('enemy.' + enemy.name)
    })
  }

  renderCharacter(character: Character) {
    if (this.characterSprite) {
      console.log('remove characterSprite')
      this.characterSprite.destroy()
    }
    const x = this.app.screen.width / 2
    const y = this.app.screen.height - 100
    this.characterSprite = this.renderActor(character, x, y, {
      showName: true,
      name: character.name
    })
  }

  renderActor(actor: IActor, x: number, y: number, { showName = true, name = '' } = {}) {
    // const containerSize = 160

    if (!actor.renderData) {
      actor.renderData = new RenderData()
    }
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
    container.x = x
    container.y = y
    actor.renderData.x = x
    actor.renderData.y = y
    //血条背景
    const healthBG = new Graphics()
    healthBG.beginFill(0x000000)
    healthBG.drawRect(healthBarX, healthBarY, spriteSize, 8)
    healthBG.endFill()
    container.addChild(healthBG)

    //血条
    const healthBar = new Graphics()
    healthBar.beginFill(0xde3249)
    healthBar.drawRect(healthBarX, healthBarY, 120, 8)
    healthBar.endFill()
    container.addChild(healthBar)

    const noiseQuad = waterShader(actor.media)
    container.addChild(actorSprite)
    // const noiseTexture = RenderTexture.create({ width: 120, height: 120 })
    // 名称
    if (showName) {
      const text = new Text(`${actor.level}级 ${name}`, {
        fontSize: 12,
        stroke: '#e2a914',
        strokeThickness: 5,
        fill: 0xffffff
      })
      text.anchor.set(0.5)
      text.y = -72
      container.addChild(text)
    }

    //伤害数字
    const damageText = new Text('', {
      fontSize: 18,
      stroke: '#000',
      strokeThickness: 3,
      fill: 0xde3249
    })
    damageText.anchor.set(0.5)
    container.addChild(damageText)

    this.app.stage.addChild(container)
    let time = 0
    let shockTime = 0
    const hitFilter = new ShockwaveFilter(
      [spriteSize / 2, spriteSize / 2],
      {
        radius:5,
        speed: 20,
        amplitude :5
      },
      0
    )
    this.app.ticker.add(() => {
      //计算血量
      const currentHealth = Math.floor((actor.currentHealth / actor.maxHealth) * 120)
      //被击中抖动
      if (actor.renderData.takeHit) {
        healthBar.clear()
        healthBar.beginFill(0xde3249)
        healthBar.drawRect(healthBarX, healthBarY, currentHealth, 8)
        healthBar.endFill()
        damageText.text = `- ${actor.renderData.takeDamage}`
        //1秒动画后重置
        if (shockTime >= 0.5) {
          actor.renderData.takeHit = false
          shockTime = 0
          damageText.text = ''
          actorSprite.filters= null
          hitFilter.time = 0
        } else {
          //计算震动
          shockTime += 1 / 60
          if(!actorSprite.filters)
            actorSprite.filters= [hitFilter]
          hitFilter.time += 0.01
          // const offset = Math.cos(shockTime * 15) * 3
          // //伤害数字
          // // console.log(actorSprite,actorSprite.transform)
          // if (actorSprite && actorSprite.transform) {
          //   actorSprite.transform.position.x = spriteOffset + offset
          //   actorSprite.transform.position.y = spriteOffset + offset
          // }
          damageText.transform.position.x = spriteOffset - shockTime * 25
          damageText.transform.position.y = spriteOffset - shockTime * 25
        }
      }

      if (currentHealth <= 0) {
        if (time === 0) {
          actorSprite.destroy()
          container.addChild(noiseQuad)
        }
        if (time <= 2) {
          time += 1 / 60
          noiseQuad.shader.uniforms.limit = Math.sin(time * 2) * 3
          this.app.renderer.render(noiseQuad)
        } else {
          container.destroy()
        }
      }
    })

    return container
  }
}
