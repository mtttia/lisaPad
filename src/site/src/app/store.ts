import { Reducer, configureStore } from '@reduxjs/toolkit'
import deviceReducer, { DeviceState } from '@site/features/DeviceSlice'

export const store = configureStore({
    reducer: {
        device: deviceReducer as Reducer<DeviceState>
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
