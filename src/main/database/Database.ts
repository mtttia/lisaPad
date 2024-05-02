import Device from './Device'
import Message from './Message'
import Setting from './Setting'
import { sequelize } from './Sequelize'

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
            serverPort: 23967
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
        const setting = await Setting.findOne()
        return { devices, setting }
    }
}
