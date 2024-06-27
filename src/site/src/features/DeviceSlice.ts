import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
export interface DeviceState {
    name: string
    associate: boolean
    token: string | null
    trust: boolean
    allowChat: boolean
    waiting: boolean
}

// Define the initial state using that type
const initialState: DeviceState = {
    name: 'Unknown Device',
    associate: false,
    token: null,
    trust: false,
    allowChat: false,
    waiting: true
}

export const deviceSlice = createSlice({
    name: 'server',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDeviceData: (state, action: PayloadAction<Omit<DeviceState, 'waiting'>>) => {
            state.name = action.payload.name
            state.token = action.payload.token
            state.trust = action.payload.trust
            state.allowChat = action.payload.allowChat
            state.associate = action.payload.associate
            state.waiting = false
        }
    }
})

export const { setDeviceData } = deviceSlice.actions

export default deviceSlice.reducer
