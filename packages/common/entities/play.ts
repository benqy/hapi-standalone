import { Schema, type } from '@colyseus/schema'

import { Userinfo } from './userinfo'
import { Character } from './character'

export class Player {
  userinfo: Userinfo
  character: Character
  characters: Character[]
}
