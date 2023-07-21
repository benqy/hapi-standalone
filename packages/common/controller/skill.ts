import { Skill } from '../entities'
import { IActor } from '../entities/interface'
import { IController, TickAble } from '../interfaces'
export class SkillController implements IController {
  actionRequired: boolean = false

  skills: Skill[] = []

  reset() {
    this.skills = []
  }

  add(skill: any) {
    this.skills.push(skill)
  }

  // excute(skill: Skill, target?: IActor) {
  //   console.log(`${skill.caster.name} 对 释放 ${skill.name}`)
  // }

  // doTick(deltaTime: number,target:I): void {
  //   console.log('skill controller: doTick')
  //   this.skills.forEach((skill) => {
  //     if (skill.targets.length > 0) {
  //       this.excute(skill, skill.targets[0])
  //     }
  //   })
  // }

  // doAction(deltaTime: number): void {
  //   console.log('skill doAction')
  // }
}
