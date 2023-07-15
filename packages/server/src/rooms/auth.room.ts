import { Room, Client } from 'colyseus'
import { RoomState } from '@hapi/common'
import { checkAuth, setUser } from '../auth'

export class AuthRoom extends Room<RoomState.UserRoomState> {
  onCreate(options: any) {
    console.log('权限验证', options)
    const state = new RoomState.UserRoomState()    
    this.setState(state)
    if (options.accessToken && typeof options.accessToken === 'string') {
      state.userinfo.accessToken = options.accessToken
    }
    // this.onMessage('*', (client, type, message) => {
    //   console.log(
    //     'AuthRoom received message from',
    //     client.sessionId,
    //     ':',
    //     message
    //   )
    // })
  }

  async onAuth(client: Client, options: any) {
    return checkAuth(options.accessToken)
  }

  onJoin(client: Client, options: any, auth: any) {
    console.log(client.sessionId, '登录房间验证通过')
    console.log('Auth data: ',client, auth,options)
    this.state.userinfo.account = 'user_' + Math.random().toString(5)
    this.state.userinfo.nickname = '随机昵称' + Math.random().toString(5)
    this.state.userinfo.sessionId = client.sessionId
    setUser(this.state.userinfo)
  }

  onLeave(client: Client) {
    console.log(client.sessionId, 'left')
  }

  onDispose() {
    console.log('Dispose AuthRoom')
  }
}
