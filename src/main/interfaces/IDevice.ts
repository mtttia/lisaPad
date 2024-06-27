export interface UnPairedDevice {
    deviceName: string
    browser: string
    os: string
}

export interface PairedDevice {
    name: string
    device: UnPairedDevice
    trust: boolean
    allowChat: boolean
    associate: boolean
}
