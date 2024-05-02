import { ipcMain } from 'electron'
import { IEvent } from './IEvent'
import { ServerStatusEvent } from './ServerStatusEvent'
import WindowController from '../controller/WindowController'
import { StartServerEvent } from './StartServerEvent'

export class EventAttacher {
    static attachEvents(windowController: WindowController) {
        const events: IEvent[] = [new ServerStatusEvent(), new StartServerEvent()]

        events.forEach((event) => {
            ipcMain.on(event.name, (e, args) => event.handler(windowController, e, args))
        })
    }
}