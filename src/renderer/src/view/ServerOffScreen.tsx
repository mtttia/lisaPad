import { Button } from "@mui/material";
import useActions from "@renderer/hooks/useActions";
import useAskIPC from "@renderer/hooks/useAskIPC";

export default function ServerOffScreen(): JSX.Element
{
  const {startServer} = useActions()
  
  const handleStartServer = () =>{
    startServer()
  }

  return (
    <div>
      <h1>Server Off</h1>
      <Button onClick={handleStartServer} variant="contained" color="primary">Start Server</Button>
    </div>
  )
}