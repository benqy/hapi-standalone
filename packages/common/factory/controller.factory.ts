import { IController } from '../interfaces'

export class ControllerFactory {
  static instances = new Map<new () => IController, IController>()
  get<T extends IController>(type: new () => T): T {
    if (!ControllerFactory.instances.has(type)) {
      ControllerFactory.instances.set(type, new type())
    }
    return ControllerFactory.instances.get(type) as T
  }
}
