import config from '@colyseus/tools'
import { monitor } from '@colyseus/monitor'
import { join } from 'path'
import { playground } from '@colyseus/playground'
import { CombatRoom } from './rooms/combat.room'
import { AuthRoom } from './rooms/auth.room'
import express from 'express'

const PUBLIC_DIR = join(__dirname, './public')
let server: any

export default config({
  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    server = gameServer
    server.define('combat_room', CombatRoom)
    server.define('auth_room', AuthRoom)
  },

  initializeExpress: (app) => {
    app.use(express.static(PUBLIC_DIR))

    app.get('/hello_world', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!")
    })

    app.get('/login', (req, res) => {
      server.define('combat_room', CombatRoom)
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
