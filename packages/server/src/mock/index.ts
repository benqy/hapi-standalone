import { Entity, Controller } from '@hapi/common'
import { LootTable } from '@hapi/common/components/loot-table'
import { ItemType } from '@hapi/common/enum'

export const getCharacter = () => {
  const character = new Entity.Character()
  const equipment = Controller.lootController.lootFromTable(new LootTable([ItemType.shoulder]),1,100)
  console.log(equipment[0])
  character.equipped.addEquipment(equipment[0])
  return character
}
