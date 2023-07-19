import { Item } from '../entities'

export interface ItemKV {
  [key: string]: Item
}

// export interface 

export type PureJson = {
  [key: string]: any
}
//
export interface DeserializeAble {
  fromJson<T>(json: PureJson)
}

export interface IController {
}

export interface ISystem {
  doTick(): void
  doAction(): void
}