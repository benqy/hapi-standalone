import { getController } from '../core'
import { Skill } from '../entities'
import { IActor } from '../entities/interface'
import { IController, TickAble } from '../interfaces'
import { getArmourDR } from '../util'
export class SkillController implements IController {
  calcDamage(caster: IActor, skill: Skill, target?: IActor) {
    const c = getController()
    const attack =
      c.affix.getProerty(caster.affixProertys, 'damage.add') *
      (1 + c.affix.getProerty(caster.affixProertys, 'damage.increase')) *
      (1 + c.affix.getProerty(caster.affixProertys, 'damage.more'))
    return attack
  }

  calcArmour(target?: IActor) {
    const c = getController()
    const armour = c.affix.getProerty(target.affixProertys, 'armour.add')
    return armour
  }

  excute(caster: IActor, skill: Skill, target?: IActor) {
    console.log(`${caster.name} 对 ${target.name} 释放 ${skill.name}`)
    const attack = this.calcDamage(caster, skill, target)
    const armourDR = getArmourDR(attack, this.calcArmour(target))
    console.log(attack, this.calcArmour(target), armourDR)
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
