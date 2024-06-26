import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
export interface DeviceState {
    name: string
    associate: boolean
    token: string | null
    trust: boolean
    allowChat: boolean
}

// Define the initial state using that type
const initialState: DeviceState = {
    name: 'Unknown Device',
    associate: false,
    token: null,
    trust: false,
    allowChat: false
}

export const deviceSlice = createSlice({
    name: 'device',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setDeviceData: (state, action: PayloadAction<DeviceState>) => {
            state.name = action.payload.name
            state.token = action.payload.token
            state.trust = action.payload.trust
            state.allowChat = action.payload.allowChat
            state.associate = action.payload.associate
        },
        resetDevice: (state) => {
            state.name = initialState.name
            state.token = initialState.token
            state.trust = initialState.trust
            state.allowChat = initialState.allowChat
            state.associate = initialState.associate
        }
    }
})

export const { setDeviceData, resetDevice } = deviceSlice.actions

export default deviceSlice.reducer
