import { Enemy } from '../entities/enemy/enemy'
import { Rarity } from '../enum'
import { Orc } from '../components'
import { FireBallSkill } from '../entities'

export class EnemyFactory {
  constructor(public config = {}) {}

  create({ level = 1, baseName = '无名', rarity = Rarity.common }) {
    let name = baseName
    const enemy = new Enemy()
    enemy.level = level
    enemy.name = name
    enemy.rarity = rarity
    enemy.breed = new Orc()
    enemy.maxHealth = Math.floor(Math.pow(level, Math.pow(level, 0.235) - 1.3) * enemy.maxHealth)
    enemy.attack = Math.floor(Math.pow(level, Math.pow(level, 0.2) - 1.23) * enemy.attack)
    enemy.experience = Math.floor(Math.pow(level, Math.pow(level, 0.1) - 0.1) * enemy.experience)
    enemy.armour = Math.floor(Math.pow(level, Math.pow(level, 0.235) - 1.3) * enemy.armour) + 2000
    enemy.currentSkills.push(new FireBallSkill())
    return enemy
  }
}
