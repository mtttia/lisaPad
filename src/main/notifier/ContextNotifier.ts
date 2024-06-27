import { Network } from '../class/Network'
import { ServerStatus } from '../class/Server'
import { INotification, INotifier } from './INotifier'

export class ContextNotifier implements INotifier {
    _channel = 'context'
    _serverStatus: ServerStatus
    _network: Network

    constructor(server: ServerStatus, network: Network) {
        this._serverStatus = server
        this._network = network
    }

    notify(): INotification {
        return {
            channel: this._channel,
            body: this._buildSendObject()
        }
    }

    _buildSendObject() {
        return {
            server: this._serverStatus,
            networks: this._network.networks
        }
    }
}
