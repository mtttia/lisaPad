import express from 'express'

export default class Server {
    _port: number
    _app: express.Application
    _running: boolean = false
    _onStart: () => void = () => {}

    get port() {
        return this._port
    }

    get running() {
        return this._running
    }

    set onStart(callback: () => void) {
        this._onStart = callback
    }

    constructor(port: number) {
        this._port = port
        this._app = express()
        this._running = false
    }

    async runServer() {
        return new Promise<void>(async (resolve) => {
            this._attachRoutes()
            await this._listen()
            resolve()
        })
    }

    _attachRoutes() {
        this._app.get('/', (req, res) => {
            res.send('Hello World!')
        })
    }

    _listen() {
        return new Promise<void>((resolve) => {
            this._app.listen(this._port, () => {
                this._running = true
                resolve()
                this._onStart()
            })
        })
    }
}
