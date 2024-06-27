import { UserSocket } from './UserSocket'

export class DeviceServerRoute {
    _sockets: Record<string, UserSocket> = {}
    _routes: Record<string, Route> = {}
    addSocket(cod: string, socket: UserSocket) {
        socket.on = (channel, data) => {
            this._handleRequest(cod, channel, data)
        }
        this._sockets[cod] = socket
    }

    on(route: string) {
        const routeObj = new Route(route)
        this._routes[route] = routeObj
        return routeObj
    }

    emit(channel: string, cod: string, data: any) {
        if (this._routes[channel]) {
            this._routes[channel].addSTDMiddleware((data: IRouteData) => {
                this._sockets[data.cod].emit(data.listener, data.data)
            })
            this._routes[channel].onServerToDevice(cod, data)
        }
    }

    private _handleRequest(cod: string, channel: string, data: any) {
        if (this._routes[channel]) {
            this._routes[channel].onDeviceToServer(cod, data)
        }
    }
}

export interface IRouteData<T = any> {
    cod: string
    data: T
    listener: string
}

class Route {
    private _route: string
    get route() {
        return this._route
    }

    private _DTSMiddleware: ((data: IRouteData, next: (data: IRouteData) => any) => any)[]
    private _STDMiddleware: ((data: IRouteData, next: (data: any) => any) => any)[]

    constructor(route: string) {
        this._route = route
        this._DTSMiddleware = []
        this._STDMiddleware = []
    }

    addDTSMiddleware(callback: (data: IRouteData, next: (data: IRouteData) => any) => any) {
        this._DTSMiddleware.push(callback)
        return this
    }

    addSTDMiddleware(callback: (data: IRouteData, next: (data: IRouteData) => any) => any) {
        this._STDMiddleware.push(callback)
        return this
    }

    onDeviceToServer(cod: string, data: any) {
        this._runDTSMiddleware({ cod, data, listener: this.route }, 0)
    }

    onServerToDevice(cod: string, data: any) {
        return this._runSTDMiddleware({ cod, data, listener: this.route }, 0) || data
    }

    private _runDTSMiddleware(data: IRouteData, index: number) {
        if (this._DTSMiddleware[index]) {
            this._DTSMiddleware[index](data, (newData) => {
                this._runDTSMiddleware(newData, index + 1)
            })
        }
    }

    private _runSTDMiddleware(data: IRouteData, index: number) {
        const next = (data: any) => {
            this._runSTDMiddleware(data, index + 1)
        }
        if (this._STDMiddleware[index]) {
            return this._STDMiddleware[index](data, next.bind(this))
        }
    }
}
