import assertAuth from '@site/hooks/assertAuth'

export default function NotAllowed() {
    assertAuth(true)

    return (
        <div>
            <h1>Not Allowed</h1>
            <p>Your device has not been allowed</p>
        </div>
    )
}
