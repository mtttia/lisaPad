import { INotifier, INotification } from './INotifier'

export default class DeviceAskToServerNotifier implements INotifier {
    _data: unknown
    _cod: string
    _listener: string

    constructor(data: unknown, cod: string, listener: string) {
        this._data = data
        this._cod = cod
        this._listener = listener
    }

    notify(): INotification {
        return {
            channel: 'device-ask-to-server',
            body: this._getMessageBody()
        }
    }

    _getMessageBody(): {
        data: unknown
        cod: string
        listener: string
    } {
        return {
            data: this._data,
            cod: this._cod,
            listener: this._listener
        }
    }
}
