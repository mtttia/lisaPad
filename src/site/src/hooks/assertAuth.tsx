import { useAppSelector } from '@site/app/hook'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function assertAuth(checkLogged = true) {
    const device = useAppSelector((state) => state.device)
    const navigate = useNavigate()
    useEffect(() => {
        if (!device.associate && checkLogged) {
            navigate('/not-allowed')
        }
        if (device.associate && !checkLogged) {
            navigate('/overview')
        }
    }, [])
}
