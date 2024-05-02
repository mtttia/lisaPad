import { Button } from "@mui/material";
import useAskIPC from "@renderer/hooks/useAskIPC";

export default function ServerOffScreen(): JSX.Element
{
  const {ask} = useAskIPC()
  
  const handleStartServer = () =>{
    ask("start-server")
  }

  return (
    <div>
      <h1>Server Off</h1>
      <Button onClick={handleStartServer} variant="contained" color="primary">Start Server</Button>
    </div>
  )
}