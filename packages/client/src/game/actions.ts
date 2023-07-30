import { F } from '@hapi/common/constants'
import { Character, Item, Userinfo } from '@hapi/common/entities'
import type { IRes } from '@hapi/common/interfaces'
import { game } from './game'
import { Room } from 'colyseus.js'
import { RenderData } from '@hapi/common/data/render-data'
// import { Intenvory } from '@hapi/common/entities/inventory'
// import { PlayerController } from '@hapi/common/controller'

export type Action = (room: Room, data: any) => void

export const actions = {
  [F.AUTH_JOIN]: (userinfo: Userinfo) => {
    // const user = plainToClass(Userinfo, userinfo)
    game.player.userinfo = userinfo
    // game.c.play.userDoAction(userinfo)
  },
  [F.G_Character_Data]: (character: Character) => {
    game.player.character = character
    game.player.character.renderData = new RenderData()
    game.startCombat('1')
  },
  [F.G_Start_Combat]: (res: IRes) => {
    if (res.code !== 200) {
      console.log(res.msg)
    } else {
      game.scene.combatMap = res.actionData.map
      console.log('start combat', res.actionData)
      game.startCombatRender()
      game.scene.inCombat.value = true
    }
  },
  [F.G_SPANW_ENEMY]: (data: any) => {
    game.render.entityRender.renderMainEnemy(data)
    game.scene.mainEnemy.value = data
    game.scene.mainEnemy.value.renderData = new RenderData()
  },
  [F.G_Add_Item]: (items: Item[]) => {
    game.c.inventory.addItem(game.character.inventory, items[0])
  },
  [F.G_EXCUTE_SKILL]: (data: any) => {
    if (game.scene.mainEnemy.value && game.scene.mainEnemy.value.currentHealth > 0) {
      game.render.skillRender.exceute(data.skill)
      game.sound.play(data.skill.name)
    }
  },
  [F.G_Hit]: (data: any) => {
    game.scene.mainEnemy.value.currentHealth -= data.damage
    game.scene.mainEnemy.value.renderData.takeDamage = data.damage
    if (game.scene.mainEnemy.value.currentHealth <= 0) {
      game.scene.mainEnemy.value = null
      game.sound.play('death')
    }
  }
}
