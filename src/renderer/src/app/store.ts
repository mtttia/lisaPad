import { Reducer, configureStore } from '@reduxjs/toolkit'
import serverReducer, { ServerState } from '../features/server/serverSlice'
import settingReducer, { SettingState } from '../features/server/settingSlice'

export const store = configureStore({
    reducer: {
        server: serverReducer as Reducer<ServerState>,
        settings: settingReducer as Reducer<SettingState>
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
