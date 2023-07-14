import { Schema, type } from '@colyseus/schema'

class World extends Schema {
  @type('number') width: number
  @type('number') height: number
  @type('number') items: number = 10
}

export class CombatRoomState extends Schema {
  @type('string') mySynchronizedProperty: string = 'Hello world1'
  @type(World) world: World = new World()

  update() {
    console.log('update')
  }
}
