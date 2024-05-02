import { app } from 'electron'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: app.getPath('userData') + '/lisaPad.db'
})

function getSequelize() {
  new Sequelize({
    dialect: 'sqlite',
    storage: app.getPath('userData') + '/lisaPad.db'
  })
}

export { sequelize, getSequelize }
