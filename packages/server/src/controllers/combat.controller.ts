import { Character, Enemy, GameMap, Skill } from '@hapi/common/entities'
import { CONSTANTS, factory } from '@hapi/common'
import { Rarity } from '@hapi/common/enum'
import { IRes, TickAble } from '@hapi/common/interfaces'
import { getController } from '@hapi/common/core'
import { lootController } from '@hapi/common/controller'
import { cache } from '../db/cache'
import { randomBetween } from '@hapi/common/util'
import { SkillController } from './skill'
import { IActor } from '@hapi/common/entities/interface'
const F = CONSTANTS.F
export class CombatController implements TickAble {
  constructor(public gameRoomId: string) {
    this.enemyFactory = new factory.EnemyFactory()
  }

  enemyFactory: factory.EnemyFactory
  skillController = new SkillController()
  mainEnemy: Enemy
  enemys: Enemy[] = []
  inCombat = false
  spawnTime = 3000
  spawnTimer = 0
  actionRequired = false
  char: Character
  map: GameMap
  
  actions: TickAble[] = []

  get gameRoom() {
    return cache.getGameRoom(this.gameRoomId)
  }

  get isCharDeath(){
    return this.char.currentHealth <=0
  }

  stop() {
    this.inCombat = false
    this.mainEnemy = null
    this.enemys = []
  }

  start(character: Character): IRes {
    if (!this.inCombat) {
      if (!this.map) {
        return {
          code: 40800,
          msg: '请选择地图',
          action: F.G_Start_Combat,
          actionData: { a: 2 },
        }
      } else {
        this.inCombat = true
        this.char = character
        return {
          code: 200,
          msg: 'ok',
          action: F.G_Start_Combat,
          actionData: {
            map: this.map,
          },
        }
      }
    }

    return {
      code: 40800,
      msg: '战斗已经开始,请勿重复',
      action: F.G_Start_Combat,
      actionData: { a: 1 },
    }
  }

  doTick(deltaTime: number) {
    const c = getController()
    if(this.isCharDeath){
      this.reStart()
    }
    else if (this.mainEnemy) {
      c.character.doTick(deltaTime)
      const skills = [].concat(
        this.char.currentSkills,
        this.mainEnemy.currentSkills
      )
      skills.forEach((skill) => {
        this.skillController.doTick(deltaTime, skill)
      })
      this.actions.forEach((action) => {
        action.doTick(deltaTime)
      })
      this.doAction(deltaTime)
    } else {
      this.spawnTimer += deltaTime
      if (this.spawnTimer >= this.spawnTime) {
        console.log('respawn')
        this.spawnEnemy()
      }
    }
  }

  excuteSkill(caster: IActor, skill: Skill, target: IActor) {
    const action = this.skillController.excute(
      caster,
      skill,
      target,
    )
    action.ownerCharacterId = this.char.id
    this.gameRoom.sendToOwner(F.G_EXCUTE_SKILL, {
      casterId: action.caster.id,
      targetId: action.target.id,
      skill: action.skill,
    })
    this.actions.push(action)
  }

  doAction(deltaTime: number) {
    const c = getController()
    c.character.doTick(deltaTime)
    this.char.currentSkills.forEach((skill) => {
      if (skill.actionRequired && this.mainEnemy.currentHealth > 0) {
        this.excuteSkill(this.char, skill, this.mainEnemy)
      }else {
        skill.actionRequired = false
      }
    })
    this.mainEnemy.currentSkills.forEach((skill) => {
      if (skill.actionRequired && !this.isCharDeath) {
        this.excuteSkill(this.mainEnemy, skill, this.char)
      }
      else {
        skill.actionRequired = false
      }
    })
    const requiredActons: TickAble[] = []
    const actions: TickAble[] = []
    this.actions.forEach((action) => {
      if (action.actionRequired) {
        requiredActons.push(action)
      } else {
        actions.push(action)
      }
    })
    this.actions = actions
    requiredActons.forEach((action) => {
      action.doAction(deltaTime)
    })
    if (this.mainEnemy.currentHealth <= 0) {
      this.loot(this.mainEnemy)
      this.mainEnemy = null
    } else if(this.isCharDeath){
      this.mainEnemy = null
    }
  }

  loot(enemy: Enemy) {
    const items = lootController.loot(enemy)
    console.log(items)
    this.gameRoom.broadcast(F.G_Add_Item, items)
    getController().inventory.addItem(this.char.inventory, items[0])
    console.log(
      `${this.mainEnemy.breed.name} ${this.mainEnemy.name} 已死亡, 获取战利品`
    )
  }

  reStart(){
    this.char.currentHealth = this.char.maxHealth
    this.stop()
    this.start(this.char)
  }

  spawnEnemy() {
    this.spawnTimer = 0
    this.mainEnemy = this.enemyFactory.create({
      level: randomBetween(this.map.minLv, this.map.maxLv),
      baseName: randomBetween(0, 16).toString(),
      rarity: Rarity.unique,
    })
    this.gameRoom.broadcast(F.G_SPANW_ENEMY, this.mainEnemy)
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
