import InternalEvent from './root/InternalEvent'

export default class DeviceChangeEvent extends InternalEvent {
    static getEventName(): string {
        return 'DeviceChangeEvent'
    }
}
