import WindowController from '../controller/WindowController'
import { IEvent } from './IEvent'

export class StopServerEvent implements IEvent {
    name: string = 'stop-server'
    handler(windowController: WindowController, event: Electron.IpcMainEvent, args: any[]) {
        windowController.onStopServer()
    }
}
