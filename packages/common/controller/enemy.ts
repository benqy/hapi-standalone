import { Enemy } from '../entities'
import { IController } from '../interfaces'
export class EnemyController implements IController {

  getProperties(enemy: Enemy) {
    return enemy.affixProertys
  }
}