import { useAppSelector } from "@site/app/hook";
import assertAuth from "@site/hooks/assertAuth";

export default function Overview()
{
    assertAuth()
    const device = useAppSelector(state => state.device)

    return (
        <div>
            <h1>Overview</h1>
            <p>Device found: {device.name}</p>
        </div>
    )
}