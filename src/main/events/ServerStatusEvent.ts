import WindowController from '../controller/WindowController'
import { IEvent } from './IEvent'

export class ServerStatusEvent implements IEvent {
    name: string = 'start-server'
    handler(_windowController: WindowController, _event: Electron.IpcMainEvent, _args: any[]) {
        return false
    }
}
