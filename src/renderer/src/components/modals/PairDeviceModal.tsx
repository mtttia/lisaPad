import { UnPairedDevice } from "@renderer/app/serverActions"
import Modal from "../common/Modal"
import { Typography, Button } from "@mui/material"
import { IDeviceAskToServerData } from "@renderer/hooks/onDeviceAskToServer"
import useReplyToDevice from "@renderer/hooks/useReplyToDevice"

export interface PairDeviceModalProps
{
    open: boolean
    onClose: () => void
    device: IDeviceAskToServerData<UnPairedDevice>|null
}

export default function PairDeviceModal(props: PairDeviceModalProps)
{
    const { open, onClose, device } = props
    const {replyToDevice} = useReplyToDevice()

    const handleOnPair = () =>
    {
        replyToDevice("new-device-info", device!.cod, { associate: true, trust: true, allowChat: true, name: devName, device:device!.data })
        onClose()
    }

    const handleOnCancel = () =>
    {
        replyToDevice("new-device-info", device!.cod, { associate: false, trust: false, allowChat: false, name: devName, device:device!.data })
        onClose()
    }

    const devName = device?.data.deviceName || device?.data.os || device?.data.browser || "Device"

    return (
        <Modal open={open} onClose={onClose}>
            {
                !device ? <Typography>Device not found</Typography>
                    : (
                        <>
                            <Typography>Device found: {devName}</Typography>
                            <Button onClick={handleOnPair}>Pair</Button>
                            <Button onClick={handleOnCancel}>Cancel</Button>
                        </>
                    )
            }
        </Modal>
    )
}