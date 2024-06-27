import { DataTypes, Model } from 'sequelize'
import { sequelize } from './Sequelize'
import { generateRandomString } from '../class/utils'

class Setting extends Model {
    declare maxDevice: number
    declare neverTrust: boolean
    declare serverPort: number
    declare defaultNetName: string | null
    declare jwtSecret: string
}

Setting.init(
    {
        maxDevice: DataTypes.INTEGER,
        neverTrust: DataTypes.BOOLEAN,
        serverPort: DataTypes.INTEGER,
        jwtSecret: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: generateRandomString(32)
        },
        defaultNetName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        tableName: 'setting'
    }
)

export default Setting
