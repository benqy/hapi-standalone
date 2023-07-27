import { F } from '@hapi/common/constants'
import { Character, Item, Userinfo } from '@hapi/common/entities'
import type { IRes } from '@hapi/common/interfaces'
import { game } from './game'
import { Room } from 'colyseus.js'
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
  },
  [F.G_Start_Combat]: (res:IRes) => {
    if(res.code !== 200) {
      console.log(res.msg)
    }
    else {
      // game.scene.mainEnemy = res.actionData.mainEnemy
      // game.scene.enemys = res.actionData.enemys
      game.scene.inCombat.value = true
      // console.log(game.scene.mainEnemy,game.scene.enemys,5)
    }
  },
  [F.G_Add_Item]:(items: Item[]) => {
    console.log('add', items)
    game.c.inventory.addItem(game.character.inventory, items[0])
  },
  [F.G_EXCUTE_SKILL]: (data: any) => {
    // const enemyHpBar = document.querySelector<HTMLElement>('.inner')
    const damage = game.scene.mainEnemy.value.currentHealth - data.target.currentHealth
    console.log(`伤害：${damage}`)
    game.scene.mainEnemy.value.currentHealth = data.target.currentHealth
    // enemyHpBar.style.width = (data.target.currentHealth / data.target.maxHealth) * 100 + '%'
  },
  [F.G_SPANW_ENEMY]: (data: any) => {
    console.log(data,'spawn')
    game.scene.mainEnemy.value = data
  }
}

// export const actionTypes = {
//   [F.AUTH_JOIN]: Userinfo
// }
