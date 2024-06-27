import useAskIPC from './useAskIPC'

export default function useReplyToDevice() {
    const { ask } = useAskIPC()

    const replyToDevice = <T>(listener: string, cod: string, data: T) => {
        ask('reply-to-device', { data, cod, listener })
    }

    return { replyToDevice }
}
