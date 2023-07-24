import { Skill } from '../entities'
import { IActor } from '../entities/interface'
import { IController, TickAble } from '../interfaces'
export class SkillController implements IController {

  excute(caster: IActor, skill: Skill, target?: IActor) {
    console.log(`${caster.name} 对 ${target.name} 释放 ${skill.name}`)
    skill.actionRequired = false
  }

    

  doTick(deltaTime: number, skill: Skill): void {
    // console.log('skill controller: doTick')
    skill.currentAttackTime += deltaTime
    if (skill.currentAttackTime >= skill.attackTime) {
      skill.currentAttackTime = skill.currentAttackTime - skill.attackTime
      skill.actionRequired = true
      skill.currentAttackTime = 0
      // console.log(`${skill.name} 可以释放了`)
    }
  }

  doAction(skill: Skill, deltaTime: number): void {
    console.log('skill doAction')
  }
}
