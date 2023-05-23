import {Configuration} from './config'
import MeetBallsGame from './game/games/meet-game'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { json } from 'body-parser'
import socketIO from 'socket.io'

export default class App {
    
    private server: http.Server
    private port: number | string

    private io: socketIO.Server

    private corsOptions = {
        origin: Configuration.ORIGIN,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }

    constructor(port: number | string) {
        this.port = port
        const app = express()

          app.use(
            '*',
            cors<cors.CorsRequest>(this.corsOptions),
            json()
          )
    
        this.server = new http.Server(app)

        this.io = new socketIO.Server(this.server, {cors: {
            origin: Configuration.ORIGIN
        }})

        app.get('/health', (req, res) => {
            res.json({
              message: 'ok',
              status: 200
            });
        });

        new MeetBallsGame(this.io)
    }

    public Start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}.`)
        })
    }
}
