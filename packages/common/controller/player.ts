import { O } from '../core'
import { IController } from '../interfaces'
import { Userinfo } from '../state'

// export function userDoAction(this: Userinfo) {
//   console.log(this.account, this.nickname, this.accessToken)
// }

export class PlayerController extends O implements IController{
  constructor() {
    super()
  }

  userDoAction(userinfo: Userinfo) {
    // console.log(userinfo.account, userinfo.nickname, userinfo.accessToken)
  }
}
