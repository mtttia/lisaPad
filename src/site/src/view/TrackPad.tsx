import assertAuth from '@site/hooks/assertAuth'

export default function TrackPad() {
    assertAuth()

    return (
        <div>
            <h1>Track pad</h1>
            <p>Control your device with track pad</p>
        </div>
    )
}
