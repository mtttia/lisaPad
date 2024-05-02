import { DataTypes, Model } from 'sequelize'
import { sequelize } from './Sequelize'
import Device from './Device'

class Message extends Model {}

Message.init(
  {
    text: DataTypes.STRING,
    filePath: DataTypes.STRING
  },
  {
    sequelize: sequelize,
    tableName: 'message'
  }
)

export default Message
