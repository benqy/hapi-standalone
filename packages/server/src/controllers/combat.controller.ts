import { Character, Enemy, Skill } from '@hapi/common/entities'
import { CONSTANTS, factory } from '@hapi/common'
import { Rarity } from '@hapi/common/enum'
import { IRes, TickAble } from '@hapi/common/interfaces'
import { getController } from '@hapi/common/core'
import { lootController } from '@hapi/common/controller'
import { cache } from '../db/cache'
const F = CONSTANTS.F
export class CombatController implements TickAble {
  constructor(public gameRoomId: string) {
    this.enemyFactory = new factory.EnemyFactory()
  }  

  enemyFactory: factory.EnemyFactory

  mainEnemy: Enemy
  enemys: Enemy[] = []
  inCombat = false
  actionRequired = false
  char: Character

  get gameRoom() {
    return cache.getGameRoom(this.gameRoomId)
  }

  stop() {
    this.inCombat = false
    this.mainEnemy = null
    this.enemys = []
    this.char = null
  }

  start(character: Character): IRes {
    if (!this.inCombat) {
      this.inCombat = true
      this.char = character
      this.mainEnemy = this.enemyFactory.create({
        level: 5,
        baseName: '首领',
        rarity: Rarity.unique,
      })
      console.log(this.mainEnemy)
      // this.enemys.push(this.enemyFactory.create({level: 1, baseName: '无名1', rarity: Rarity.common}))
      // this.enemys.push(this.enemyFactory.create({level: 2, baseName: '无名2', rarity: Rarity.common}))
      // this.enemys.push(this.enemyFactory.create({level: 3, baseName: '无名3', rarity: Rarity.common}))
      return {
        code: 200,
        msg: 'ok',
        action: F.G_Start_Combat,
        actionData: {
          mainEnemy: this.mainEnemy,
          enemys: this.enemys,
        },
      }
    }

    return {
      code: 40800,
      msg: '战斗已经开始,请勿重复',
      action: F.G_Start_Combat,
      actionData: { a: 1 },
    }
  }

  doTick(deltaTime: number) {
    const c = getController()
    if(!this.inCombat) return
    c.character.doTick(deltaTime)
    this.char.currentSkills.forEach((skill) => {
      c.skill.doTick(deltaTime, skill)
    })
    // this.mainEnemy.currentSkills.forEach((skill) => {
    //   c.skill.doTick(deltaTime, skill)
    //   // c.skill.excute(this.mainEnemy,skill,this.char)
    // })
    this.doAction(deltaTime)
    // c.skill.doTick(deltaTime,this.mainEnemy)
  }

  doAction(deltaTime: number) {
    const c = getController()
    c.character.doTick(deltaTime)
    this.char.currentSkills.forEach((skill) => {
      if (skill.actionRequired) {
        if(this.mainEnemy.currentHealth > 0){
          c.skill.excute(this.char, skill, this.mainEnemy)
            
        }
      }
    })
    this.mainEnemy.currentSkills.forEach((skill) => {
      if (skill.actionRequired) {
        c.skill.excute(this.mainEnemy, skill, this.char)
      }
    })
    if(this.mainEnemy.currentHealth <= 0) {
      this.loot(this.mainEnemy)
      this.stopCombat()
    }
  }

  loot(enemy:Enemy) {
    const items = lootController.loot(this.mainEnemy)
    console.log(items)
    this.gameRoom.broadcast(F.G_Add_Item, items)
    getController().inventory.addItem(this.char.inventory, items[0])
    console.log(`${this.mainEnemy.breed.name} ${this.mainEnemy.name} 已死亡, 获取战利品`)
  }

  stopCombat() {
    this.inCombat = false
    this.mainEnemy = null
    this.enemys = []
    this.char = null
  }

  spawnEnemy() {
    console.log('spawn')
  }

  // doCombatTick(){
  //   this.currentAttackTime += SYSTEM_CONFIG.combatFrameTime
  //   if(this.currentAttackTime > this.baseValue.status.attackTime ) {
  //     this.needAction = true
  //     this.doCombatAction()
  //   }
  // }

  // doCombatAction(){
  //   this.currentAttackTime = Math.max(0, this.currentAttackTime - this.baseValue.status.attackTime)
  //   console.log('attack')
  // }
}
