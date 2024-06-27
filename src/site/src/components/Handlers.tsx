import { useAppDispatch, useAppSelector } from '@site/app/hook'
import useActions from '@site/hooks/useActions'
import { DeviceState, resetDevice, setDeviceData } from '@site/features/DeviceSlice'
import { resetWaiting, stopWaiting } from '@site/features/WaitingSlice'
import useSocket from '@site/hooks/useSocket'
import { useNavigate } from 'react-router-dom'

export default function Handlers() {
    const dispatch = useAppDispatch()
    const { on } = useSocket()
    const { login, associate } = useActions()
    const device = useAppSelector((state) => state.device)
    const navigate = useNavigate()

    on('connect', () => {
        if (device.associate) {
            login()
        } else {
            associate()
        }
    })

    on('new-device-info', (data: DeviceState) => {
        dispatch(setDeviceData(data))
        if (!data.associate) {
            navigate('/not-allowed')
        } else {
            navigate('/overview')
        }
        dispatch(stopWaiting())
    })

    on('login-device', (data: DeviceState) => {
        if (!data.associate) {
            associate()
        } else {
            dispatch(setDeviceData(data))
            navigate('/overview')
            dispatch(stopWaiting())
        }
    })

    on('ask-disconnect', (data: { error?: string }) => {
        if (data.error) {
            console.error(data.error)
        } else {
            dispatch(resetDevice())
            dispatch(resetWaiting())
            navigate('/not-allowed')
        }
    })

    return <></>
}
