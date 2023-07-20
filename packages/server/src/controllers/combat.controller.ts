import { Enemy } from "@hapi/common/entities"
import { CONSTANTS, factory } from "@hapi/common"
import { Rarity } from "@hapi/common/enum"
import { IRes } from "@hapi/common/interfaces"
const F = CONSTANTS.F
export class CombatController{

  
  constructor(){
    this.enemyFactory = new factory.EnemyFactory()
  }
  
  enemyFactory: factory.EnemyFactory

  mainEnemy:Enemy
  enemys:Enemy[] = []
  inCombat = false

  stop() {
    this.inCombat = false
    this.mainEnemy = null
    this.enemys = []
  }

  start():IRes {
    console.log('start')
    if(!this.inCombat) {
      this.inCombat = true
      this.mainEnemy =  this.enemyFactory.create({level: 5, baseName: '无名', rarity: Rarity.unique})
      this.enemys.push(this.enemyFactory.create({level: 1, baseName: '无名1', rarity: Rarity.common}))
      this.enemys.push(this.enemyFactory.create({level: 2, baseName: '无名2', rarity: Rarity.common}))
      this.enemys.push(this.enemyFactory.create({level: 3, baseName: '无名3', rarity: Rarity.common}))
      return {
        code: 200,
        msg: 'ok',
        action: F.G_Start_Combat,
        actionData: {
          mainEnemy: this.mainEnemy,
          enemys: this.enemys,
        }
      }
    }
    
    return {
      code: 40800,
      msg: '战斗已经开始,请勿重复',
      action: F.G_Start_Combat,
      actionData: {a:1}
    }
  }

}