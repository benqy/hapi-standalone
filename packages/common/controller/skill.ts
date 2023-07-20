import { Skill } from '../entities'
import { IController, TickAble } from '../interfaces'
export class SkillController implements IController, TickAble {
  actionRequired: boolean = false
  
  skills:Skill[] = []

  add(skill: any) {
    this.skills.push(skill)
  }

  doTick(deltaTime: number): void {
    console.log('skill doTick')
  }

  doAction(deltaTime: number): void {
    console.log('skill doAction')
  }
}