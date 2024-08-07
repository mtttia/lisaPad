import Device from '../Device'

export default abstract class DeviceQuery {
    static getAllBindDevices(): Promise<Device[]> {
        return Device.findAll({ where: { trust: true } })
    }
}
