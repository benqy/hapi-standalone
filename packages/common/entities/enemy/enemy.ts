import { IActor } from '../interface'
import { O } from '../../core/base'
import { Rarity } from '../../enum'
import { Breed } from '../../components/breed'
import { AffixProertys } from '../modifiers/affix-property'

export class Enemy extends O implements IActor {
  constructor() {
    super()
  }
  public rarity: Rarity = Rarity.common
  public attack: number = 5
  public evasion = 67
  public maxHealth: number = 22
  public experience = 20
  public armour = 22
  public level: number = 1
  name: string = 'BUG'
  currentHealth: number
  breed: Breed
  affixProertys = new AffixProertys()


  media = `/static/game/enemy/${this.name}.webp`

  //掉落稀有度倍率
  get iir() {
    switch (this.Rarity) {
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
    switch (this.Rarity) {
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
    if (this.Rarity === Rarity.magic) dropLevel++
    else if (this.Rarity === Rarity.rare) dropLevel += 2
    else if (this.Rarity === Rarity.unique) dropLevel += 3
    if (dropLevel > 100) {
      dropLevel === 100
    }
    return dropLevel
  }
}
