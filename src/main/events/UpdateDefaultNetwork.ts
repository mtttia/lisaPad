import WindowController from '../controller/WindowController'
import { IEvent } from './IEvent'

export class UpdateDefaultNetworks implements IEvent {
    name: string = 'update-default-network'
    handler(windowController: WindowController, event: Electron.IpcMainEvent, args: any[]) {
        windowController.onUpdateDefaultNetwork(args[0])
    }
}
