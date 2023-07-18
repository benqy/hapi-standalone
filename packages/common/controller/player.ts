import { Player } from '../entities'
import { IController } from '../interfaces'
import { Userinfo } from '../state'

// export function userDoAction(this: Userinfo) {
//   console.log(this.account, this.nickname, this.accessToken)
// }

export class PlayerController implements IController{
  constructor() {
    console.log('PlayerController constructor')
  }

  userDoAction(userinfo: Userinfo) {
    console.log(userinfo.account, userinfo.nickname, userinfo.accessToken)
  }
}
