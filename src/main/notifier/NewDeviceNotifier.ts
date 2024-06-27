import { UnPairedDevice } from '../interfaces/IDevice'
import { INotifier, INotification } from './INotifier'

export default class NewDeviceNotifier implements INotifier {
    _device: UnPairedDevice

    constructor(device: UnPairedDevice) {
        this._device = device
    }

    notify(): INotification {
        return {
            channel: 'new-device',
            body: this._getMessageBody()
        }
    }

    _getMessageBody(): {
        device: UnPairedDevice
    } {
        return {
            device: this._device
        }
    }
}
