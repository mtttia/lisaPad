import { useAppSelector } from '@site/app/hook'
import useSocket from './useSocket'
import UAParser from 'ua-parser-js'

export default function useActions() {
    const { on, emit } = useSocket()
    const device = useAppSelector((state) => state.device)

    const login = () => {
        emit('login-device', { token: device.token })
    }

    const associate = () => {
        const parser = new UAParser()

        emit('new-device-info', {
            deviceName: parser.getOS().name || 'Unknown',
            browser: parser.getBrowser().name || 'Unknown',
            os: `${parser.getOS().name} v.${parser.getOS().version}` || 'Unknown'
        })
    }

    const disconnect = () => {
        emit('ask-disconnect')
    }

    return { login, associate, disconnect }
}
