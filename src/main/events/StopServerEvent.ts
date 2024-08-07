import WindowController from '../controller/WindowController'
import { IEvent } from './IEvent'

export class StopServerEvent implements IEvent {
    name: string = 'stop-server'
    handler(windowController: WindowController, _event: Electron.IpcMainEvent, _args: any[]) {
        windowController.onStopServer()
    }
}
