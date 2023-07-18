import { IController } from '../interfaces'

export class ControllerFactory {
  get<T extends IController>(type: new () => T): T {
    console.log(type)
    return new type()
  }
}
