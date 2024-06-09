import { Actions } from "@renderer/app/serverActions"
import useAskIPC from "./useAskIPC"


export default function useActions()
{
    const {ask} = useAskIPC()

    const __startServer = () =>
    {
        ask(Actions.START_SERVER)
    }

    const __stopServer = () =>
    {
        ask(Actions.STOP_SERVER)
    }

    return {
        startServer: __startServer,
        stopServer: __stopServer
    }
}