import { Socket } from 'socket.io'

export class UserSocket {
    private _cod: string
    private socket: Socket
    private _onCallback: (channel: string, data: unknown) => void = () => {}

    get cod(): string {
        return this._cod
    }

    constructor(cod: string, socket: Socket) {
        this._cod = cod
        this.socket = socket
        this.attachEvent()
    }

    allowConnection(jwt: string) {
        this.socket.emit('allow-connection', { token: jwt })
    }

    denyConnection() {
        this.socket.emit('deny-connection')
    }

    private attachEvent() {
        this.socket.onAny((event, data) => {
            this._onCallback(event, data)
        })
    }

    emit(channel: string, data: unknown) {
        this.socket.emit(channel, data)
    }

    set on(callback: (channel: string, data: unknown) => void) {
        this._onCallback = callback
    }
}

export interface IDeviceInfo {
    deviceName: string
    browser: string
    os: string
}
