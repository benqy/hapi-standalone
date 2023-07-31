import { Enemy } from '../entities/enemy/enemy'
import { PathKey, Rarity } from '../enum'
import { Orc } from '../components'
import { FireBallSkill } from '../entities'
import { IMG_DIR } from '../constants'
import { getController } from '../core'

export class EnemyFactory {
  constructor(public config = {}) {}

  create({ level = 1, baseName = 'bug', rarity = Rarity.common }) {
    let name = baseName
    let attack = 5
    // let evasion = 67
    let armour = 22
    const enemy = new Enemy()
    const c = getController().affix
    enemy.level = level
    enemy.name = name
    enemy.rarity = rarity
    enemy.breed = new Orc()
    enemy.maxHealth = Math.floor(
      Math.pow(level, Math.pow(level, 0.235) - 1.3) * enemy.maxHealth
    )
    enemy.currentHealth = enemy.maxHealth
    c.setProerty(
      enemy.affixProertys,
      PathKey.damage_add,
      Math.floor(Math.pow(level, Math.pow(level, 0.2) - 1.23) * attack)
    )
    c.setProerty(
      enemy.affixProertys,
      PathKey.armour_add,
      Math.floor(Math.pow(level, Math.pow(level, 0.2) - 1.23) * armour)
    )
    enemy.experience = Math.floor(
      Math.pow(level, Math.pow(level, 0.1) - 0.1) * enemy.experience
    )
    enemy.currentSkills.push(new FireBallSkill())
    enemy.media = `${IMG_DIR}/enemy/${name}.webp`
    return enemy
  }
}
