import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

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

    return {
        socket: socket,
        on,
        emit
    }
}
