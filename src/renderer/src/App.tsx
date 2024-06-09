import { useEffect, useState } from "react"
import LoadingScreen from "./view/LoadingScreen"
import useTimeout from "./hooks/useTimeOut"
import DashboardScreen from "./view/DashboardScreen"
import ServerOffScreen from "./view/ServerOffScreen"
import Setting from"./setting/setting"
import useListenIPC from "./hooks/useListenIPC"
import { useAppDispatch, useAppSelector } from "./app/hook"
import { setServerData } from "./features/server/serverSlice"
import { Container } from "@mui/material"
import { IContext, Listener } from "./app/serverActions"

function App(): JSX.Element
{
  const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()
    const {running} = useAppSelector(state => state.server)
    const { data: context } = useListenIPC<IContext>("context", null)
  
  useEffect(() =>
  {
    if (context)
    {
      dispatch(setServerData(context.server))
        
    }
  }, [context])

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
    if (running)
    {
      Component = <DashboardScreen />
    }
    else
    {
      Component = <ServerOffScreen />
    }
  }

  return (
    <Container>
      {Component}
    </Container>
  )
}

export default App
