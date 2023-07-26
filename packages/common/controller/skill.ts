import { getController } from '../core'
import { Enemy, Skill } from '../entities'
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
    let armour = 0
    if(target instanceof Enemy) {
      armour = target.armour
    }
    armour +=  c.affix.getProerty(target.affixProertys, 'armour.add')
    armour *= 1 + c.affix.getProerty(target.affixProertys, 'armour.increase')
    return armour
  }

  excute(caster: IActor, skill: Skill, target?: IActor) {
    const attack = this.calcDamage(caster, skill, target)
    const armourDR = getArmourDR(attack, this.calcArmour(target))
    // console.log(attack, this.calcArmour(target), armourDR)
    const damage = Math.max(Math.floor(attack * (1 - armourDR)),0)
    target.currentHealth -= Math.max(damage, 0)

    console.log(`${caster.name} 对 ${target.name} 释放 ${skill.name}, 造成了${damage}点伤害, 剩余血量${target.currentHealth}`)
    if(target.currentHealth <= 0) {
      console.log(`${target.name} 已死亡`)
    }
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
