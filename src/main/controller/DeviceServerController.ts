import DeviceManager from '../class/DeviceManager'
import { DeviceServerRoute, IRouteData } from '../class/DeviceServerRoutes'
import { PairedDevice } from '../interfaces/IDevice'

export class DeviceServerController {
    private deviceServerRoute: DeviceServerRoute
    private askToRendererHandler: (listener: string, cod: string, data: any) => void

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
    }

    emit(listener: string, cod: string, data: any) {
        this.deviceServerRoute.emit(listener, cod, data)
    }

    private askToRendererMiddleware(data: IRouteData<any>) {
        const cod = data.cod
        const dataToRenderer = data.data
        this.askToRendererHandler(data.listener, cod, dataToRenderer)
    }

    async registerDevice(data: IRouteData<PairedDevice>, next: (data: any) => any) {
        let token = ''
        let pairedDevice = data.data
        if (pairedDevice.associate) {
            const device = await DeviceManager.registerDevice(data.cod, data.data)
            token = device.token
        }
        next({
            name: pairedDevice.name,
            associate: pairedDevice.associate,
            trust: pairedDevice.trust,
            allowChat: pairedDevice.allowChat,
            token: token
        })
    }
}
