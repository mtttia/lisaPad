import * as os from 'os'

export interface NetworkInterfaceInfo {
    name: string
    address: string
}

export class Network {
    _networks: NetworkInterfaceInfo[] = []

    get networks(): NetworkInterfaceInfo[] {
        return this._networks
    }

    get systemDefaultNetwork(): NetworkInterfaceInfo | null {
        if (this.networks.length > 0) {
            return this.networks[0]
        }
        return null
    }

    constructor(defaultNetworkName: string | null = null) {
        this._networks = this.getNetworkInterfaces()
        this._applyDefaultNetwork(defaultNetworkName)
    }

    getNetworkInterfaces(): NetworkInterfaceInfo[] {
        const interfaces = os.networkInterfaces()
        const result: NetworkInterfaceInfo[] = []

        for (const name in interfaces) {
            if (interfaces.hasOwnProperty(name)) {
                const netInterface = interfaces[name]
                if (netInterface) {
                    for (const net of netInterface) {
                        // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
                        if (!net.internal && net.family === 'IPv4') {
                            result.push({
                                name,
                                address: net.address
                            })
                        }
                    }
                }
            }
        }

        return result
    }

    _getDefaultNetworkName(defaultNameFromApp) {
        if (defaultNameFromApp != null && this.networks.some((n) => n.name == defaultNameFromApp))
            return defaultNameFromApp
        return this.systemDefaultNetwork
    }

    _applyDefaultNetwork(defaultNetworkName: string | null) {
        const firstNetworkName = this._getDefaultNetworkName(defaultNetworkName)
        this.networks.sort((_na, nb) => {
            if (nb.name == firstNetworkName) {
                return -1
            }
            return 1
        })
    }
}
