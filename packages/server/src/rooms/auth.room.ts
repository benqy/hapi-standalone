import { Room, Client } from 'colyseus'
import { CONSTANTS, RoomState } from '@hapi/common'
import { checkAuth, setUser, getUser, createUser } from '../auth'

export class AuthRoom extends Room<RoomState.Player> {
  maxClients = 200
  onCreate(options: any) {
    console.log('创建权限验证房间')
    // const state = new RoomState.Player()
    // this.setState(state)
    // if (options.accessToken && typeof options.accessToken === 'string') {
    //   state.userinfo.accessToken = options.accessToken
    // }
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
    // console.log('Auth data: ',client, auth,options)
    let userinfo = getUser(options.accessToken)
    if (!userinfo) {
      userinfo = createUser(options.accessToken)
      setUser(userinfo)
    }
    console.log('加入权限房间验证通过', userinfo)
    client.send(CONSTANTS.F.AUTH_JOIN, userinfo)
    // client.send()
  }

  // onLeave(client: Client) {
  //   console.log(client.sessionId, 'left')
  // }

  onDispose() {
    console.log('Dispose AuthRoom')
  }
}
