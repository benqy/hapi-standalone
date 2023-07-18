import { ControllerFactory } from '../factory'
import {
  CharacterController,
  PlayerController,
  AffixController,
} from '../controller'
export * from './base'

const controllerFactory = new ControllerFactory()
let sControllers = {
  
}
let cControllers = {}
export const getServerController = () => {
  return {
    play: controllerFactory.get<PlayerController>(PlayerController),
    character: controllerFactory.get<CharacterController>(CharacterController),
    affix: controllerFactory.get<AffixController>(AffixController),
  }
}

export const getClientController = ()=>{
  return getServerController()
}
