import assertAuth from "@site/hooks/assertAuth"

export default function Chat()
{
    assertAuth()
    
    return (
        <div>
            <h1>Chat</h1>
            <p>Chat with other devices</p>
        </div>
    )
}