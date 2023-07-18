import { CONSTANTS } from '@hapi/common'
import { Client } from 'colyseus.js'

export const client = new Client(CONSTANTS.SOCKET_URL)
