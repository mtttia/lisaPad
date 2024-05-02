import WindowController from '../controller/WindowController'
import { IEvent } from './IEvent'

export class ServerStatusEvent implements IEvent {
    name: string = 'start-server'
    handler(windowController: WindowController, event: Electron.IpcMainEvent, args: any[]) {
        return false
    }
}
