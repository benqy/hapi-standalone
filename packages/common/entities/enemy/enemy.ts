import { IActor } from '../interface'
import { O } from '../../core/base'
import { Rarity } from '../../enum'
import { Breed } from '../../components/breed'
import { AffixProertys } from '../modifiers/affix-property'
import { IMG_DIR } from '../../constants'
import { Skill } from '../skill'
import { RenderData } from '../../data/render-data'

export class Enemy extends O implements IActor {
  constructor() {
    super()
  }
  name: string = 'BUG'
  breed: Breed
  maxHealth: number = 22
  currentHealth: number = 22
  level: number = 1
  media = `${IMG_DIR}/enemy/bug.webp`
  currentSkills: Skill[] = []
  renderData?:RenderData
  affixProertys = new AffixProertys()
  
  rarity: Rarity = Rarity.common
  attack: number = 5
  evasion = 67
  experience = 20
  armour = 22
  
  //掉落稀有度倍率
  get iir() {
    switch (this.rarity) {
      case Rarity.common:
        return 1
      case Rarity.magic:
        return 2
      case Rarity.rare:
        return 4
      case Rarity.unique:
        return 6
      default:
        return 1
    }
  }

  //掉落数量倍率
  get iiq() {
    switch (this.rarity) {
      case Rarity.common:
        return 1
      case Rarity.magic:
        return 2
      case Rarity.rare:
        return 4
      case Rarity.unique:
        return 6
      default:
        return 1
    }
  }

  //怪物掉落等级,魔法+1,稀有+2,传奇+3
  get dropLevel() {
    let dropLevel = this.level
    if (this.rarity === Rarity.magic) dropLevel++
    else if (this.rarity === Rarity.rare) dropLevel += 2
    else if (this.rarity === Rarity.unique) dropLevel += 3
    if (dropLevel > 100) {
      dropLevel === 100
    }
    return dropLevel
  }
}
