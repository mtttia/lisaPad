import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
export interface ServerState {
    running: boolean
    port: number | null
}

// Define the initial state using that type
const initialState: ServerState = {
    running: false,
    port: null
}

export const serverSlice = createSlice({
    name: 'server',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setServerData: (state, action: PayloadAction<ServerState>) => {
            state.port = action.payload.port
            state.running = action.payload.running
        }
    }
})

export const { setServerData } = serverSlice.actions

export default serverSlice.reducer
