import { useEffect, useState } from "react"
import LoadingScreen from "./view/LoadingScreen"
import useTimeout from "./hooks/useTimeOut"
import DashboardScreen from "./view/DashboardScreen"
import ServerOffScreen from "./view/ServerOffScreen"
import Setting from"./setting/setting"
import {useListenIPC} from "./hooks/useListenIPC"
import { useAppDispatch, useAppSelector } from "./app/hook"
import { setServerData } from "./features/server/serverSlice"
import { Container } from "@mui/material"
import { IContext, IUpdateSetting, UnPairedDevice } from "./app/serverActions"
import { setNetworks, updateSettings } from "./features/server/settingSlice"
import PairDeviceModal from "./components/modals/PairDeviceModal"
import { IDeviceAskToServerData, onDeviceAskToServer } from "./hooks/onDeviceAskToServer"
import useReplyToDevice from "./hooks/useReplyToDevice"

function App(): JSX.Element
{
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  const { running } = useAppSelector(state => state.server)
  const [newDeviceFormOpen, setNewDeviceFormOpen] = useState(false)
  const [newDeviceData, setNewDeviceData] = useState<IDeviceAskToServerData<UnPairedDevice>|null>(null)
  const { data: context } = useListenIPC<IContext>("context", null)
  const { data: dbSetting } = useListenIPC<IUpdateSetting>("setting-update", null)
  const { replyToDevice } = useReplyToDevice()
  
  
  onDeviceAskToServer<UnPairedDevice>("new-device-info", (data) =>
  {
    setNewDeviceData(data)
    setNewDeviceFormOpen(true)
  })

  onDeviceAskToServer<UnPairedDevice>("ping", (data) =>
  {
    console.log(data);
    replyToDevice("pong", data.cod, { message: "pong" })
  })
  
  
  useEffect(() =>
  {
    if (context)
    {
      dispatch(setServerData(context.server))
      dispatch(setNetworks(context.networks))
    }
  }, [context])

  useEffect(() =>
  {
    if (dbSetting)
    {
      dispatch(updateSettings(dbSetting))
    }
  }, [dbSetting])

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
      <PairDeviceModal
        open={newDeviceFormOpen}
        onClose={() => setNewDeviceFormOpen(false)}
        device={newDeviceData}
      />
    </Container>
  )
}

export default App
