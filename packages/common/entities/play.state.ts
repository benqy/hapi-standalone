import { Schema, type } from '@colyseus/schema'

import { Userinfo } from '../state/userinfo.state'

export class Player extends Schema {
  @type(Userinfo) userinfo: Userinfo = new Userinfo()

  update() {
    console.log('update')
  }
}
