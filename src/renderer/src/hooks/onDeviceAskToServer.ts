import { onListenIPC } from './useListenIPC'

export function onDeviceAskToServer<T>(
    listen: string,
    callback: (data: IDeviceAskToServerData<T>) => void
) {
    onListenIPC('device-ask-to-server', (data: IDeviceAskToServerData<T>) => {
        if (data.listener === listen) {
            callback(data)
        }
    })
}

export interface IDeviceAskToServerData<T> {
    cod: string
    data: T
    listener: string
}
