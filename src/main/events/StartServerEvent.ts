import WindowController from '../controller/WindowController'
import { IEvent } from './IEvent'

export class StartServerEvent implements IEvent {
    name: string = 'start-server'
    handler(windowController: WindowController, _event: Electron.IpcMainEvent, _args: any[]) {
        windowController.onRunServer()
    }
}
