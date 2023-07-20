import { ControllerFactory } from '../factory'
import {
  CharacterController,
  PlayerController,
  AffixController,
  EquipmentController,
  InventoryController,
  ItemController,
  EnemyController,
  SkillController,
} from '../controller'
export * from './base'

const controllerFactory = new ControllerFactory()
export const getController = () => {
  return {
    play: controllerFactory.get<PlayerController>(PlayerController),
    character: controllerFactory.get<CharacterController>(CharacterController),
    affix: controllerFactory.get<AffixController>(AffixController),
    equipment: controllerFactory.get<EquipmentController>(EquipmentController),
    inventory: controllerFactory.get<InventoryController>(InventoryController),
    item: controllerFactory.get<ItemController>(ItemController),
    enemy: controllerFactory.get<EnemyController>(EnemyController),
    skill: controllerFactory.get<SkillController>(SkillController),
  }
}

export const getClientController = () => {
  return getController()
}
