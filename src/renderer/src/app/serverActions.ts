export enum Actions {
    START_SERVER = 'start-server',
    STOP_SERVER = 'stop-server'
}

export enum Listener {
    CONTEXT = 'context'
}

export interface IContext {
    server: {
        running: boolean
        port: number | null
    }
}
