import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import UAParser from 'ua-parser-js'

const URL = 'http://localhost:23967'

export const socket = io(URL)

export default function useSocket() {
    const on = (eventName: string, callback: (...args: any[]) => void) => {
        useEffect(() => {
            socket.on(eventName, callback)
            return () => {
                socket.off(eventName, callback)
            }
        }, [])
    }

    const emit = (eventName: string, ...args: any[]) => {
        socket.emit(eventName, ...args)
    }

    const connect = () => {
        const parser = new UAParser()

        emit('new-device-info', {
            deviceName: parser.getOS().name || 'Unknown',
            browser: parser.getBrowser().name || 'Unknown',
            os: `${parser.getOS().name} v.${parser.getOS().version}` || 'Unknown'
        })
    }

    return {
        socket: socket,
        connect,
        on,
        emit
    }
}
