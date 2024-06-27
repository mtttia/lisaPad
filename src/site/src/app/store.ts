import { Reducer, configureStore } from '@reduxjs/toolkit'
import deviceReducer, { DeviceState } from '@site/features/DeviceSlice'
import waitingReducer, { WaitingState } from '@site/features/WaitingSlice'

interface State {
    device: DeviceState
    waiting: WaitingState
}

export const store = configureStore({
    reducer: {
        device: deviceReducer as Reducer<DeviceState>,
        waiting: waitingReducer as Reducer<WaitingState>
    },
    preloadedState: (JSON.parse(localStorage.getItem('state') as string) as State) || undefined
})

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify({ ...store.getState(), waiting: undefined }))
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
