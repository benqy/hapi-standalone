import { Room, Client } from 'colyseus'
import { RoomState } from '@hapi/common'

export class AuthRoom extends Room<RoomState.UserRoomState> {
  onCreate(options: any) {
    console.log('权限房间create', options)
    const state = new RoomState.UserRoomState()
    
    this.setState(state)
    if (options.accessToken && typeof options.accessToken === 'string') {
      state.userinfo.accessToken = options.accessToken
    }
    this.onMessage('*', (client, type, message) => {
      console.log(
        'AuthRoom received message from',
        client.sessionId,
        ':',
        message
      )
    })
  }

  async onAuth(client: Client, options: any) {
    //临时的客户端简单用户token
    if (options?.accessToken.length > 36) {
      return true
    } else {
      return false
    }
  }

  onJoin(client: Client, options: any, auth: any) {
    console.log(client.sessionId, '登录房间验证通过')
    console.log('Auth data: ',client, auth,options)
    this.state.userinfo.account = 'user_' + Math.random().toString(5)
    this.state.userinfo.nickname = '随机昵称' + Math.random().toString(5)
    this.state.userinfo.sessionId = client.sessionId
  }

  onLeave(client: Client) {
    console.log(client.sessionId, 'left')
  }

  onDispose() {
    console.log('Dispose AuthRoom')
  }
}
