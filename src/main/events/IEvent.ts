import WindowController from '../controller/WindowController'

export interface IEvent {
    name: string
    handler: (
        windowController: WindowController,
        event: Electron.IpcMainEvent,
        args: any[]
    ) => unknown
}
