import { Character, Enemy, Skill } from '@hapi/common/entities'
import { IActor } from '@hapi/common/entities/interface'
import { AffixProertys } from '@hapi/common/entities/modifiers/affix-property'
import { TickAble } from '@hapi/common/interfaces'
import { getArmourDR } from '@hapi/common/util'
import { getController } from '@hapi/common/core'
import { GameRoom } from '../rooms/game.room'
import { F } from '@hapi/common/constants'

export class SkillAction implements TickAble {
  constructor(public skill: Skill) {}

  caster: IActor
  target: IActor
  ownerCharacterId: string
  actionTime: number = 1000000
  currentActionTime: number = 0
  actionRequired: boolean = false

  calcDamage() {
    const c = getController()
    let ap: AffixProertys
    if (this.caster instanceof Character) {
      ap = c.character.getProperties(this.caster)
    } else {
      ap = this.caster.affixProertys
    }
    const attack =
      c.affix.getProerty(ap, 'damage.add') *
      (1 + c.affix.getProerty(ap, 'damage.increase') / 100) *
      (1 + c.affix.getProerty(ap, 'damage.more') / 100) *
      this.skill.percent
    return attack
  }

  calcArmour() {
    const c = getController()
    let armour = 0
    if (this.target instanceof Enemy) {
      armour = this.target.armour
    }
    armour += c.affix.getProerty(this.target.affixProertys, 'armour.add')
    armour *=
      1 + c.affix.getProerty(this.target.affixProertys, 'armour.increase')
    return armour
  }

  doTick(deltaTime: number): void {
    this.currentActionTime += deltaTime
    // console.log(this.currentActionTime)
    if (this.currentActionTime >= this.actionTime) {
      this.actionRequired = true
    }
  }

  doAction(deltaTime: number): void {
    this.currentActionTime = Math.max(
      0,
      this.currentActionTime - this.actionTime
    )
    const attack = this.calcDamage()
    const armourDR = getArmourDR(attack, this.calcArmour())
    // console.log(attack, this.calcArmour(target), armourDR)
    const damage = Math.max(Math.floor(attack * (1 - armourDR)), 1)
    this.target.currentHealth = Math.max(this.target.currentHealth - damage, 0)
    GameRoom.sendToOwner(this.ownerCharacterId, F.G_Hit, {
      caster: this.caster.id,
      target: this.target.id,
      damage,
      skill: this.skill,
    })
    // console.log(
    //   `${this.caster.name} 对 ${this.target.name} 释放 ${this.skill.name}, 造成了${damage}点伤害, 剩余血量${this.target.currentHealth}`
    // )
    if (this.target.currentHealth <= 0) {
      console.log(`${this.target.name} 已死亡`)
    }
  }
}
