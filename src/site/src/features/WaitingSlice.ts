import { createSlice } from '@reduxjs/toolkit'
// Define a type for the slice state
export interface WaitingState {
    waiting: boolean
}

// Define the initial state using that type
const initialState: WaitingState = {
    waiting: true
}

export const waitingSlice = createSlice({
    name: 'waiting',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        stopWaiting: (state) => {
            state.waiting = false
        },
        resetWaiting: (state) => {
            state.waiting = initialState.waiting
        }
    }
})

export const { stopWaiting, resetWaiting } = waitingSlice.actions

export default waitingSlice.reducer
