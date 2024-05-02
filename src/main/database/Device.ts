import { DataTypes, Model } from 'sequelize'
import { sequelize } from './Sequelize'
import Message from './Message'

class Device extends Model {}

Device.init(
  {
    name: DataTypes.STRING,
    cod: DataTypes.STRING,
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
