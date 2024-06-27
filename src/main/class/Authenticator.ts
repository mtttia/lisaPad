import Device from '../database/Device'

export default class Authenticator {
    private cache: Map<string, Device> = new Map()

    public async authWithToken(token: string, cod: string): Promise<Device | null> {
        const device = await Device.loadFromToken(token)
        if (device) {
            this.cache.set(cod, device)
        }
        return device
    }

    public auth(cod: string): Device | null {
        if (this.cache.has(cod)) {
            return this.cache.get(cod) as Device
        }
        return null
    }

    public reload() {
        this.cache.forEach((device) => {
            if (Device.findOne({ where: { id: device.id } }) === null) {
                this.cache.delete(device.cod)
            } else {
                device.reload()
            }
        })
    }
}
