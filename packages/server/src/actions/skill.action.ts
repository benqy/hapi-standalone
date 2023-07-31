import { Skill } from '@hapi/common/entities'
import { IActor } from '@hapi/common/entities/interface'
import { TickAble } from '@hapi/common/interfaces'
import { calcArmour, calcDamage, calcArmourDR } from '@hapi/common/util'
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

  doTick(deltaTime: number): void {
    this.currentActionTime += deltaTime
    if (this.currentActionTime >= this.actionTime) {
      this.actionRequired = true
    }
  }

  doAction(deltaTime: number): void {
    this.currentActionTime = Math.max(
      0,
      this.currentActionTime - this.actionTime
    )
    const attack = calcDamage(this.skill, this.caster)
    const armourDR = calcArmourDR(attack, calcArmour(this.target))
    // console.log(attack, this.calcArmour(target), armourDR)
    const damage = Math.max(Math.floor(attack * (1 - armourDR)), 1)
    this.target.currentHealth = Math.max(this.target.currentHealth - damage, 0)
    GameRoom.sendToOwner(this.ownerCharacterId, F.G_Hit, {
      casterId: this.caster.id,
      targetId: this.target.id,
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
