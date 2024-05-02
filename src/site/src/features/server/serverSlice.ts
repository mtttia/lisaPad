import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
export interface ServerState {
    serverRunning: boolean
    devices: any[]
    settings: any
}

// Define the initial state using that type
const initialState: ServerState = {
    serverRunning: false,
    devices: [],
    settings: null
}

export const serverSlice = createSlice({
    name: 'server',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setServerState: (state, action: PayloadAction<boolean>) => {
            state.serverRunning = action.payload
        },
        setDevices: (state, action: PayloadAction<any[]>) => {
            state.devices = action.payload
        },

        setSettings: (state, action: PayloadAction<any>) => {
            state.settings = action.payload
        }
    }
})

export const { setServerState, setDevices, setSettings } = serverSlice.actions

export default serverSlice.reducer
