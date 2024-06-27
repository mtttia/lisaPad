export enum Actions {
    START_SERVER = 'start-server',
    STOP_SERVER = 'stop-server'
}

export enum Listener {
    CONTEXT = 'context'
}

export interface IContext {
    server: IServerStatus
    networks: INetwork[]
}

export interface IUpdateSetting {
    setting: ISetting
    devices: IDevice[]
}

export interface IDevice {
    name: string
    cod: string
    token: string
    trust: boolean
    allowChat: boolean
}

export interface ISetting {
    maxDevice: number
    neverTrust: boolean
    serverPort: number
    defaultNetName: string | null
}

export interface INetwork {
    name: string
    address: string
}

export interface IServerStatus {
    running: boolean
    port: number | null
}

export interface UnPairedDevice {
    deviceName: string
    browser: string
    os: string
}

export interface PairedDevice {
    cod: string
    name: string
    device: UnPairedDevice
    trust: boolean
    allowChat: boolean
    associate: boolean
}
