import { Entity, Controller } from '@hapi/common'
import { LootTable } from '@hapi/common/components/loot-table'
import { getController } from '@hapi/common/core'
import { equipmentFromCategorys2, itemCategorys2, world1Data } from '@hapi/common/data'
import { FireBallSkill, GameMap } from '@hapi/common/entities'

export const getCharacter = () => {
  const character = new Entity.Character()

  equipmentFromCategorys2.forEach((item) => {
    const equipment = Controller.lootController.lootFromTable(
      new LootTable([item]),
      1,
      1
    )
    getController().equipment.addEquipment(character.equipped, equipment[0])
  })
  // equipmentFromCategorys2.forEach((item) => {
  //   const equipment = Controller.lootController.lootFromTable(
  //     new LootTable([item]),
  //     1,
  //     100
  //   )
  //   getController().inventory.addItem(character.inventory, equipment[0])
  // })
  character.currentSkills.push(new FireBallSkill())
  character.maxHealth = 50
  character.currentHealth = 50
  character.affixProertys.properties.set('damage.add', 10)

  // console.log(character.equipped.affixProertys,character.affixProertys)
  return character
}

export const getMaps = ():GameMap[] => {
  return world1Data.maps
}