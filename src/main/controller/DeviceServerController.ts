import Authenticator from '../class/Authenticator'
import DeviceManager from '../class/DeviceManager'
import { DeviceServerRoute, IRouteData } from '../class/DeviceServerRoutes'
import Device from '../database/Device'
import { PairedDevice } from '../interfaces/IDevice'

export class DeviceServerController {
    private deviceServerRoute: DeviceServerRoute
    private askToRendererHandler: (listener: string, cod: string, data: any) => void
    private authenticator: Authenticator = new Authenticator()

    constructor(
        deviceServerRoute: DeviceServerRoute,
        askToRendererHandler: (listener: string, cod: string, data: any) => void
    ) {
        this.deviceServerRoute = deviceServerRoute
        this.askToRendererHandler = askToRendererHandler
    }

    handleEvent() {
        const askToRendererMiddleware = this.askToRendererMiddleware.bind(this)
        this.deviceServerRoute.on('ping').addDTSMiddleware(askToRendererMiddleware)
        this.deviceServerRoute
            .on('new-device-info')
            .addDTSMiddleware(askToRendererMiddleware)
            .addSTDMiddleware(this.registerDevice.bind(this))
        this.deviceServerRoute.on('login-device').addDTSMiddleware(this.authToken.bind(this))
        this.deviceServerRoute
            .on('ask-disconnect')
            .addDTSMiddleware(this.authDevice.bind(this))
            .addDTSMiddleware(this.disconnect.bind(this))
    }

    emit(listener: string, cod: string, data: any) {
        this.deviceServerRoute.emit(listener, cod, data)
    }

    private askToRendererMiddleware(data: IRouteData<any>) {
        const cod = data.cod
        const dataToRenderer = data.data
        this.askToRendererHandler(data.listener, cod, dataToRenderer)
    }

    async registerDevice(data: IRouteData<PairedDevice>, next: (data: IRouteData<any>) => any) {
        let token = ''
        let pairedDevice = data.data
        if (pairedDevice.associate) {
            const device = await DeviceManager.registerDevice(data.cod, data.data)
            token = device.token
        }
        next({
            ...data,
            data: {
                name: pairedDevice.name,
                associate: pairedDevice.associate,
                trust: pairedDevice.trust,
                allowChat: pairedDevice.allowChat,
                token: token
            }
        })
    }

    private async authToken(data: IRouteData<{ token: string }>) {
        const device = await this.authenticator.authWithToken(data.data.token, data.cod)
        this.emit(data.listener, data.cod, {
            name: device?.name || '',
            associate: device !== null,
            trust: device?.trust || false,
            allowChat: device?.allowChat || false,
            token: device?.token || ''
        })
    }

    private async authDevice(data: IRouteData<any>, next: (data: IRouteData) => any) {
        const device = await this.authenticator.auth(data.cod)
        if (device) {
            next({ ...data, data: { ...data.data, device } })
        } else {
            this.emit(data.listener, data.cod, { error: 'auth-failed' })
        }
    }

    private async disconnect(data: IRouteData<{ device: Device }>) {
        await data.data.device.destroy()
        this.authenticator.reload()
        this.emit(data.listener, data.cod, { success: true })
    }
}
