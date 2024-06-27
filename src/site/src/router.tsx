import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import Chat from './view/Chat'
import Overview from './view/Overview'
import TrackPad from './view/TrackPad'
import NotAllowed from './view/NotAllowed'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/not-allowed',
                element: <NotAllowed />
            },
            {
                path: '/overview',
                element: <Overview />
            },
            {
                path: '/chat',
                element: <Chat />
            },
            {
                path: '/track-pad',
                element: <TrackPad />
            }
        ]
    }
])

export default router
