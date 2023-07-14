import { Schema, type } from '@colyseus/schema'

export class Userinfo extends Schema {
  @type('string') account: string
  @type('string') nickname:string
  @type('string') accessToken: string
}

export class UserRoomState extends Schema {
  @type(Userinfo) userinfo: Userinfo = new Userinfo()

  update() {
    console.log('update')
  }
}
