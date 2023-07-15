import { Schema, type } from '@colyseus/schema'

import { Userinfo } from './userinfo.state'

export class UserRoomState extends Schema {
  @type(Userinfo) userinfo: Userinfo = new Userinfo()

  update() {
    console.log('update')
  }
}
