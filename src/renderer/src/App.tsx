import { useEffect, useState } from "react"
import LoadingScreen from "./view/LoadingScreen"
import useTimeout from "./hooks/useTimeOut"
import DashboardScreen from "./view/DashboardScreen"
import ServerOffScreen from "./view/ServerOffScreen"
import Setting from"./setting/setting"
import useListenIPC from "./hooks/useListenIPC"
import { useAppDispatch, useAppSelector } from "./app/hook"
import { setServerState } from "./features/server/serverSlice"
import useAskIPC from "./hooks/useAskIPC"

function App(): JSX.Element
{
  const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    const {serverRunning} = useAppSelector(state => state.server)
    const { data: serverConnected } = useListenIPC<boolean>("server-status", false)
    const {invoke} = useAskIPC()
  
  useEffect(() =>
  {
      //when server state change notify the app
      dispatch(setServerState(serverConnected || false))
  }, [serverConnected])
    
    useEffect(() =>
    {
        //once app load ask the server for the server status
        invoke<boolean>("server-status").then((status) =>
        {
            dispatch(setServerState(status))
        })
    }, [])

  const onLoadingComplete = () =>
  {
    setIsLoading(false)
  }

  useTimeout(onLoadingComplete, Setting.pages.loadingTime)
  
  let Component: JSX.Element = <></>
  if (isLoading)
  {
    Component = <LoadingScreen />
  }
  else
  {
    if (serverRunning)
    {
      Component = <DashboardScreen />
    }
    else
    {
      Component = <ServerOffScreen />
    }
  }

  return (
    <>
      {Component}
    </>
  )
}

export default App
