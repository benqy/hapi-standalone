import config from '@colyseus/tools'
import { monitor } from '@colyseus/monitor'
import { join } from 'path'
import { playground } from '@colyseus/playground'
import { GameRoom } from './rooms/game.room'
import { AuthRoom } from './rooms/auth.room'
import { CONSTANTS } from '@hapi/common'
import express from 'express'

const PUBLIC_DIR = join(__dirname, './public')


export default config({
  initializeGameServer: (gameServer) => {
    // const tempServer = gameServer as any; // force access to private property by casting to any
    // tempServer.exposedMethods = []; // override property with empty array to not expose those methods anymore
    gameServer.define(CONSTANTS.ROOM_GAME, GameRoom,)
    gameServer.define(CONSTANTS.ROOM_AUTH, AuthRoom)
  },

  initializeExpress: (app) => {
    app.use(express.static(PUBLIC_DIR))

    app.get('/hello_world', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!")
    })

    app.get('/login', (req, res) => {
      // server.define('combat_room', CombatRoom)
    })
    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    if (process.env.NODE_ENV !== 'production') {
      app.use('/', playground)
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use('/colyseus', monitor())
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
})
