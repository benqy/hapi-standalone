// import { Enemy } from '../entities/enemy/enemy'
// import { Rarity } from '../enum'

// export class EnemySpawner {
//   constructor(config) {
//     this.config = config || {}
//   }

//   create({ level = 1, baseName = '无名', rarity = Rarity.common }) {
//     let name = baseName
//     const enemy = new Enemy()
//     enemy.level = level
//     enemy.name = name
//     enemy.rarity = rarity
//     enemy.maxHealth *= parseInt(Math.pow(level, Math.pow(level, 0.235) - 1.3))
//     enemy.attack *= parseInt(Math.pow(level, Math.pow(level, 0.2) - 1.23))
//     enemy.experience *= parseInt(Math.pow(level, Math.pow(level, 0.1) - 0.1))
//     enemy.armour *= parseInt(Math.pow(level, Math.pow(level, 0.235) - 1.3))
//     return enemy
//   }
// }
