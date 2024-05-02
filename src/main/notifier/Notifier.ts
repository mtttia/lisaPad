import { BrowserWindow } from 'electron'
import { INotifier } from './INotifier'

export class Notifier {
  _notificationWindows: BrowserWindow[]

  constructor(windows: BrowserWindow[] = []) {
    this._notificationWindows = windows
  }

  pushNotificationWindow(window: BrowserWindow) {
    this._notificationWindows.push(window)
  }

  clearNotificationWindows() {
    this._notificationWindows = []
  }

  notify(notifier: INotifier) {
    this._notificationWindows.forEach((window) => {
      window.webContents.send(notifier.notify().channel, notifier.notify().body)
    })
  }
}
