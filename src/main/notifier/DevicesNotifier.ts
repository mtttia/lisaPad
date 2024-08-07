import Device from '../database/Device'
import { INotification, INotifier } from './INotifier'

export default class DevicesNotifier implements INotifier {
    devices: Device[]

    constructor(devices: Device[]) {
        this.devices = devices
    }

    notify(): INotification {
        return {
            channel: 'devices',
            body: this.devices
        }
    }
}
