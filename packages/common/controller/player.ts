import { O } from '../core'
import { IController } from '../interfaces'
import { Userinfo } from '../state'


export class PlayerController implements IController{
  constructor() {
  }

  userDoAction(userinfo: Userinfo) {
    // console.log(userinfo.account, userinfo.nickname, userinfo.accessToken)
  }
}
