import WindowController from '../controller/WindowController'
import { IEvent } from './IEvent'

export class ReplyToDeviceEvent implements IEvent {
    name: string = 'reply-to-device'
    handler(windowController: WindowController, _event: Electron.IpcMainEvent, args: any[]) {
        windowController.onReplyToDevice(args[0])
    }
}
