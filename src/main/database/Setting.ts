import { DataTypes, Model } from 'sequelize'
import { sequelize } from './Sequelize'

class Setting extends Model {
    declare maxDevice: number
    declare neverTrust: boolean
    declare serverPort: number
}

Setting.init(
    {
        maxDevice: DataTypes.INTEGER,
        neverTrust: DataTypes.BOOLEAN,
        serverPort: DataTypes.INTEGER
    },
    {
        sequelize,
        tableName: 'setting'
    }
)

export default Setting
