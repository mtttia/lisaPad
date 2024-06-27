import TokenManager from './TokenManager'
import Device from '../database/Device'
import Database from '../database/Database'
import { PairedDevice } from '../interfaces/IDevice'

export default abstract class DeviceManager {
    static async registerDevice(cod: string, pairedDevice: PairedDevice): Promise<Device> {
        const { name, trust, allowChat } = pairedDevice
        const token = await TokenManager.createToken({ name, cod, trust, allowChat })
        return await Database.registerDevice({ name, token, trust, allowChat })
    }
}
