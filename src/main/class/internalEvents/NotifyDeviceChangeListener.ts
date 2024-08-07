import Database from '../../database/Database'
import DevicesNotifier from '../../notifier/DevicesNotifier'
import { Notifier } from '../../notifier/Notifier'
import DeviceChangeEvent from './DeviceChangeEvent'
import InternalListener from './root/InternalListener'

export default class NotifyDeviceChangeListener implements InternalListener {
    private _notifier: Notifier

    constructor(notifier: Notifier) {
        this._notifier = notifier
    }

    async handleEvent(_event: DeviceChangeEvent): Promise<void> {
        const devices = await Database.Device.getAllBindDevices()
        this._notifier.notify(new DevicesNotifier(devices))
    }
}
