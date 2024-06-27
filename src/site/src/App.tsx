import { useAppSelector } from '@site/app/hook'
import { Button, Container } from '@mui/material'

import { Outlet, useNavigate } from 'react-router-dom'
import useActions from './hooks/useActions'
import Handlers from './components/Handlers'

function App(): JSX.Element {
    const waiting = useAppSelector((state) => state.waiting.waiting)
    const navigate = useNavigate()
    const { disconnect } = useActions()

    return (
        <Container>
            <Handlers />
            {waiting ? (
                <div>Waiting for device binding</div>
            ) : (
                <>
                    <Outlet />
                    <Button onClick={() => navigate('/overview')}>Overview</Button>
                    <Button onClick={() => navigate('/chat')}>Chat</Button>
                    <Button onClick={() => navigate('/track-pad')}>TrackBad</Button>
                    <Button onClick={() => disconnect()}>Disconnect</Button>
                </>
            )}
        </Container>
    )
}

export { App }
