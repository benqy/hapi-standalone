import { IActor } from '../interface'
import { O } from '../../core/base'
import { Equipped } from '../../components/equipped'
import { AffixProertys } from '../modifiers/affix-property'
import { Intenvory } from '../inventory'
import { IMG_DIR } from '../../constants'
import { Skill } from '../skill'
import { Breed, PlayerBreed } from '../../components'
import { RenderData } from '../../data/render-data'

export class Character extends O implements IActor {
  constructor() {
    super()
  }

  name = 'BUG'
  breed: Breed = new PlayerBreed()
  maxHealth = 100
  currentHealth: number = 100
  level = 1
  media: string = `${IMG_DIR}/enemy/100.webp`
  currentSkills: Skill[] = []
  renderData?:RenderData
  affixProertys = new AffixProertys()
  
  inventory = new Intenvory(168)
  //角色基础战斗数据
  equipped: Equipped = new Equipped()
}
