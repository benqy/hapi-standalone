import { getController } from '../core'
import { Character, Enemy, Skill } from '../entities'
import { IActor } from '../entities/interface'
import { AffixProertys } from '../entities/modifiers/affix-property'
import { PathKey } from '../enum'

export function calcArmourDR(attack, armour) {
  if (attack <= 0) return 0
  return armour / (armour + 5 * attack)
}

export function calcDamage(skill: Skill, source: IActor) {
  const c = getController()
  let ap: AffixProertys
  if (source instanceof Character) {
    ap = c.character.getProperties(source)
  } else if (source instanceof Enemy) {
    ap = c.enemy.getProperties(source)
  }
  const attack =
    c.affix.getProerty(ap, PathKey.damage_add) *
    (1 + c.affix.getProerty(ap, PathKey.damage_increase) / 100) *
    (1 + c.affix.getProerty(ap, PathKey.damage_more) / 100) *
    skill.percent
  return attack
}

export function calcArmour(source: IActor) {
  const c = getController()
  let armour = 0
  if (source instanceof Enemy) {
    armour = source.armour
  }
  armour += c.affix.getProerty(source.affixProertys, PathKey.armour_add)
  armour *=
    1 + c.affix.getProerty(source.affixProertys, PathKey.armour_increase)
  return armour
}
