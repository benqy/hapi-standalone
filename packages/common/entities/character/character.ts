import { IActor } from '../interface'
import { O } from '../../core/base'
import { Equipped } from '../../components/equipped'
import { AffixProertys } from '../modifiers/affix-property'
import { Intenvory } from '../inventory'
import { IMG_DIR } from '../../constants'
import { Skill } from '../skill'
import { Breed, PlayerBreed } from '../../components'

export class Character extends O implements IActor {
  constructor() {
    super()
  }

  name = 'BUG'
  maxHealth = 100
  breed: Breed = new PlayerBreed()
  currentHealth: number = 100
  media: string = `${IMG_DIR}/enemy/100.webp`
  inventory = new Intenvory(168)
  isDeath = false
  //角色基础战斗数据
  affixProertys = new AffixProertys()
  equipped: Equipped = new Equipped()

  currentSkills: Skill[] = []
}
