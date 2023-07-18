import { Item } from '../entities'

export interface ItemKV {
  [key: string]: Item
}

export type PureJson = {
  [key: string]: any
}
//
export interface DeserializeAble {
  fromJson<T>(json: PureJson)
}

export interface IController {
}