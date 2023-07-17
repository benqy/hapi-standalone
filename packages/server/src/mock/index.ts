import { Entity, Controller } from '@hapi/common'
import { LootTable } from '@hapi/common/components/loot-table'
import { equipmentFromCategorys2, itemCategorys2 } from '@hapi/common/data'

export const getCharacter = () => {
  const character = new Entity.Character()

  equipmentFromCategorys2.forEach((item) => {
    const equipment = Controller.lootController.lootFromTable(
      new LootTable([item]),
      1,
      100
    )
    character.equipped.addEquipment(equipment[0])
  })
  return character
}
