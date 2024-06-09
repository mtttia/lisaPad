import { ServerStatus } from '../class/Server'
import { INotification, INotifier } from './INotifier'

export class ContextNotifier implements INotifier {
    _channel = 'context'
    _serverStatus: ServerStatus

    constructor(server: ServerStatus) {
        this._serverStatus = server
    }

    notify(): INotification {
        return {
            channel: this._channel,
            body: this._buildSendObject()
        }
    }

    _buildSendObject() {
        return {
            server: this._serverStatus
        }
    }
}
