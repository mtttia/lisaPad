import { DataTypes, Model } from 'sequelize'
import { sequelize } from './Sequelize'
import Message from './Message'

class Device extends Model {
    declare name: string
    declare cod: string
    declare token: string
    declare trust: boolean
    declare allowChat: boolean
}

Device.init(
    {
        name: DataTypes.STRING,
        cod: DataTypes.STRING,
        token: DataTypes.STRING,
        trust: DataTypes.BOOLEAN,
        allowChat: DataTypes.BOOLEAN
    },
    {
        sequelize,
        tableName: 'device'
    }
)

Device.hasMany(Message, {
    foreignKey: 'deviceId'
})

Message.belongsTo(Device, {
    foreignKey: 'deviceId'
})

export default Device
