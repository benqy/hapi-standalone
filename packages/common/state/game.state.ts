import { Schema, type, filter, ArraySchema } from '@colyseus/schema'
import { Client } from 'colyseus'
import { Player } from '../entities'

// export class Card extends Schema {
//   @type('string') owner: string // contains the sessionId of Card owner
//   @type('boolean') discarded: boolean = false

//   /**
//    * DO NOT USE ARROW FUNCTION INSIDE `@filter`
//    * (IT WILL FORCE A DIFFERENT `this` SCOPE)
//    */
//   @filter(function (
//     this: Card, // the instance of the class `@filter` has been defined (instance of `Card`)
//     client: Client, // the Room's `client` instance which this data is going to be filtered to
//     value: Card['number'], // the value of the field to be filtered. (value of `number` field)
//     root: Schema // the root state Schema instance
//   ) {
//     console.log(this, client, value, root, 333)
//     return false
//   })
//   @type('uint8')
//   number: number
// }

export class Game extends Schema {
  //当前用户
  player: Player

  @type('string') playerId: string
  
}
