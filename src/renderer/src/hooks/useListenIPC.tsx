import { useEffect, useState } from "react"

export function useListenIPC<T>(channel:string, defaultValue:T|null = null): {data: T|null, event: Electron.IpcRendererEvent|null}{
    const ipcRenderer = window.electron.ipcRenderer
    const [data, setData] = useState<T | null>(defaultValue)
    const [event, setEvent] = useState<Electron.IpcRendererEvent | null>(null)

    useEffect(() => {
        ipcRenderer.on(channel, (event, arg) => {
            setData(arg)
            setEvent(event)
        })
        return () => {
            ipcRenderer.removeAllListeners(channel)
        }
    }, [channel])

    return {data, event}
}

export function onListenIPC<T>(channel:string, callback:(data:T,event: Electron.IpcRendererEvent) => void) {
    const ipcRenderer = window.electron.ipcRenderer

    useEffect(() => {
        ipcRenderer.on(channel, (event, arg) => {
            callback(arg, event)
        })
        return () => {
            ipcRenderer.removeAllListeners(channel)
        }
    }, [channel])
}