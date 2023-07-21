import { Character, Enemy, Skill } from "@hapi/common/entities"
import { CONSTANTS, factory } from "@hapi/common"
import { Rarity } from "@hapi/common/enum"
import { IRes,TickAble } from "@hapi/common/interfaces"
import { getController } from "@hapi/common/core"
import { IActor } from "@hapi/common/entities/interface"
const F = CONSTANTS.F
export class CombatController implements TickAble{
  constructor(){
    this.enemyFactory = new factory.EnemyFactory()
  }
  
  enemyFactory: factory.EnemyFactory

  mainEnemy:Enemy
  enemys:Enemy[] = []
  inCombat = false
  actionRequired = false
  char: Character
  

  stop() {
    this.inCombat = false
    this.mainEnemy = null
    this.enemys = []
    this.char = null
  }

  start(character: Character):IRes {
    if(!this.inCombat) {
      this.inCombat = true
      this.char = character
      this.mainEnemy =  this.enemyFactory.create({level: 5, baseName: '无名', rarity: Rarity.unique})
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

  excute(caster:IActor, skill: Skill, target?: IActor) {
    console.log(`${caster.name} 对 ${target.name} 释放 ${skill.name}`)
  }

  doTick(deltaTime: number) {
    const c = getController()
    c.character.doTick(deltaTime)
    console.log('combat:doTick')
    this.char.currentSkills.forEach(skill=>{
      this.excute(this.char,skill,this.mainEnemy)
    })
    this.mainEnemy.currentSkills.forEach(skill=>{
      this.excute(this.mainEnemy,skill,this.char)
    })
    // c.skill.doTick(deltaTime,this.mainEnemy)
  }

  doAction(deltaTime: number) {
      
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