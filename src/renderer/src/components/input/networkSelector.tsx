import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useAppSelector } from "@renderer/app/hook"
import useAskIPC from "@renderer/hooks/useAskIPC"

export default function NetworkSelector()
{
    const {ask} = useAskIPC()
    let { networks, setting } = useAppSelector(state => state.settings)
    networks = networks.slice().sort((_a, b) => b.name == setting?.defaultNetName ? 1 : -1)

    const handleChange = (event: SelectChangeEvent) =>
    {
        ask("update-default-network", event.target.value)
    }

    let value = setting?.defaultNetName;
    if (!value && networks.length > 0)
    {
        value = networks[0].name
    }

    return (
        <Select
            value={value || ""}
            onChange={handleChange}       
        >
            {networks.map(network => (
                <MenuItem key={network.name} value={network.name}>{network.name} - {network.address}</MenuItem>
            ))}
        </Select>
    )
}