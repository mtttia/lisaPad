import Device from '../database/Device'
import Setting from '../database/Setting'
import { INotifier, INotification } from './INotifier'

export default class DBUpdateNotifier implements INotifier {
  _devices: Device[]
  _setting: Setting

  constructor(device: Device[], setting: Setting) {
    this._devices = device
    this._setting = setting
  }

  set devices(devices: Device[]) {
    this._devices = devices
  }

  set setting(setting: Setting) {
    this._setting = setting
  }

  notify(): INotification {
    return {
      channel: 'setting-update',
      body: this._getMessageBody()
    }
  }

  _getMessageBody(): {
    devices: Device[]
    setting: Setting
  } {
    return {
      devices: this._devices,
      setting: this._setting
    }
  }
}
