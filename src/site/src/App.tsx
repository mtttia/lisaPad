import useSocket from "./hooks/useSocket"
import { useAppDispatch, useAppSelector } from "@site/app/hook"
import { setDeviceData } from "./features/DeviceSlice"
import { Container } from "@mui/material"

function App(): JSX.Element {
  const { connect, on } = useSocket()
  const dispatch = useAppDispatch()
  const device = useAppSelector(state => state.device)

  on("connect", () =>
  {
    connect()
  })

  on("new-device-info", (data) => {
      dispatch(setDeviceData(data))
  })

  return (
    <Container>
      {
        device.waiting ? (
          <div>Waiting for device binding</div>
        ) : (<>{device.associate ? (
            <div>
            <div>Device Name: {device.name}</div>
            <div>Trust: {device.trust ? "Yes" : "No"}</div>
            <div>Chat: {device.allowChat ? "Yes" : "No"}</div>
          </div>
          ) : (
            <div>Device is not associated</div>
            )}</>
        )
      }
    </Container>
  )
}

export {App}
