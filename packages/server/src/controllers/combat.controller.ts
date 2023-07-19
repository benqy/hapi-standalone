import { Enemy } from "@hapi/common/entities"
import { factory } from "@hapi/common"
import { Rarity } from "@hapi/common/enum"
export class CombatController{
  constructor(){
    this.enemyFactory = new factory.EnemyFactory()
  }
  
  enemyFactory: factory.EnemyFactory

  mainEnemy:Enemy
  enemys:Enemy[] = []

  start() {
    console.log('start')
    this.mainEnemy = null
    this.enemys = []
    this.mainEnemy =  this.enemyFactory.create({level: 5, baseName: '无名', rarity: Rarity.unique})
    this.enemys.push(this.enemyFactory.create({level: 1, baseName: '无名1', rarity: Rarity.common}))
    this.enemys.push(this.enemyFactory.create({level: 2, baseName: '无名2', rarity: Rarity.common}))
    this.enemys.push(this.enemyFactory.create({level: 3, baseName: '无名3', rarity: Rarity.common}))
  }

}