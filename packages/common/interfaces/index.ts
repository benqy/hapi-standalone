import { Item } from '../entities'

export interface ItemKV {
  [key: string]: Item
}

// export interface

export type JsObject = {
  [key: string]: any
}
//
export interface DeserializeAble {
  fromJson<T>(json: JsObject)
}

export interface IController {}

export interface ISystem {
  doTick(): void
  doAction(): void
}

export interface IRes {
  code: number
  msg: string
  action: string
  actionData: any
}
