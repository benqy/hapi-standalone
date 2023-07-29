import { SkillAction } from '../actions/skill.action'
import { Skill } from '../entities'
import { IActor } from '../entities/interface'
import { IController } from '../interfaces'
export class SkillController implements IController {

  excute(caster: IActor, skill: Skill, target?: IActor) {
    skill.currentAttackTime = Math.max(0, skill.currentAttackTime - skill.attackTime)
    skill.actionRequired = false
    const action = new SkillAction(skill)
    action.caster = caster
    action.target = target
    action.actionTime = skill.actionTime
    console.log('释放技能', action)
    return action
  }

  doTick(deltaTime: number, skill: Skill): void {
    skill.currentAttackTime += deltaTime
    if (skill.currentAttackTime >= skill.attackTime) {
      skill.actionRequired = true
    }
  }
}
