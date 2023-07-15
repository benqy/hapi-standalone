import { Schema, type } from '@colyseus/schema'

export class Userinfo extends Schema {
  @type('string') account: string
  @type('string') nickname:string
  @type('string') accessToken: string
  @type('string') sessionId: string
}