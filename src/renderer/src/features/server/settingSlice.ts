import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDevice, INetwork, ISetting } from '@renderer/app/serverActions'
// Define a type for the slice state
export interface SettingState {
    setting: ISetting | null
    devices: IDevice[]
    networks: INetwork[]
}

// Define the initial state using that type
const initialState: SettingState = {
    setting: null,
    devices: [],
    networks: []
}

export const serverSlice = createSlice({
    name: 'server',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateSettings: (state, action: PayloadAction<Omit<SettingState, 'networks'>>) => {
            state.setting = action.payload.setting
            state.devices = action.payload.devices
        },
        setNetworks: (state, action: PayloadAction<SettingState['networks']>) => {
            state.networks = action.payload
        }
    }
})

export const { updateSettings, setNetworks } = serverSlice.actions

export default serverSlice.reducer
