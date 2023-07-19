import { Enemy } from '../entities/enemy/enemy'
import { Rarity } from '../enum'
import { Breed, Orc } from '../components'

export class EnemySpawner {
  constructor(public config = {}) {}

  create({ level = 1, baseName = '无名', rarity = Rarity.common }) {
    let name = baseName
    const enemy = new Enemy()
    enemy.level = level
    enemy.name = name
    enemy.rarity = rarity
    enemy.breed = new Orc()
    enemy.maxHealth *= Math.floor(Math.pow(level, Math.pow(level, 0.235) - 1.3))
    enemy.attack *= Math.floor(Math.pow(level, Math.pow(level, 0.2) - 1.23))
    enemy.experience *= Math.floor(Math.pow(level, Math.pow(level, 0.1) - 0.1))
    enemy.armour *= Math.floor(Math.pow(level, Math.pow(level, 0.235) - 1.3))
    return enemy
  }
}
