import Device from './Device'
import Message from './Message'
import Setting from './Setting'
import { sequelize } from './Sequelize'
import { generateRandomString } from '../class/utils'
import { Optional } from 'sequelize'
import DeviceQuery from './sql/DeviceQuery'

export default abstract class Database {
    static async checkDB() {
        await sequelize.authenticate()
        sequelize.sync({ alter: true })
        this.checkSetting()
    }

    static checkSetting() {
        return Setting.findOne().then((setting) => {
            if (!setting) {
                this.SeedSetting()
            }
        })
    }

    static SeedSetting() {
        return Setting.create({
            maxDevice: 2,
            neverTrust: false,
            serverPort: 23967,
            jwtSecret: generateRandomString(32)
        })
    }

    static async loadData(): Promise<{ devices: any[]; setting: any }> {
        const devices = await Device.findAll({
            include: [
                {
                    model: Message
                }
            ]
        })
        const setting = await this.loadSetting()
        return { devices, setting }
    }

    static async loadSetting() {
        let setting = Setting.findOne()
        if (!setting) {
            await this.SeedSetting()
            setting = Setting.findOne()
        }
        return setting
    }

    static async registerDevice(device: Optional<any, string> | undefined): Promise<Device> {
        return await Device.create(device)
    }

    static Device = DeviceQuery
}
