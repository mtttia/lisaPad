import express from 'express'
import { is } from '@electron-toolkit/utils'
import { IncomingMessage, ServerResponse, Server as httpServer } from 'http'
const { createProxyMiddleware } = require('http-proxy-middleware')

export interface ServerStatus {
    port: number | null
    running: boolean
}

export default class Server {
    _port: number
    _app: express.Application
    _server: httpServer<typeof IncomingMessage, typeof ServerResponse> | null = null
    _running: boolean = false
    _onStart: () => void = () => {}
    _onStop: () => void = () => {}

    get port() {
        return this._port
    }

    get running() {
        return this._running
    }

    set onStart(callback: () => void) {
        this._onStart = callback
    }

    set onStop(callback: () => void) {
        this._onStop = callback
    }

    constructor(port: number) {
        this._port = port
        this._app = express()
        this._running = false
    }

    async runServer() {
        return new Promise<void>(async (resolve) => {
            this._attachRoutes()
            if (is.dev) {
                this._app.use(
                    createProxyMiddleware({
                        target: 'http://localhost:4143',
                        changeOrigin: false
                    })
                )
            } else {
                this._app.use(express.static('out/site'))
            }
            await this._listen()
            resolve()
        })
    }

    _attachRoutes() {}

    _listen() {
        return new Promise<void>(async (resolve) => {
            this._server = this._app.listen(this._port, () => {
                this._running = true
                resolve()
                this._onStart()
            })
        })
    }

    async stopServer() {
        if (this.running && this._server) {
            this._server.close(() => {
                this._running = false
                this._onStop()
            })
        }
    }

    getServerStatus(): ServerStatus {
        return {
            port: this.port,
            running: this.running
        }
    }
}
