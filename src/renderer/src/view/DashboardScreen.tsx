import { Button, Stack, Typography } from "@mui/material";
import useActions from "@renderer/hooks/useActions";
import { useAppSelector } from "../app/hook"

export default function DashboardScreen(): JSX.Element
{
  const { stopServer } = useActions();
  const {port} = useAppSelector(state => state.server)
  
  return (
    <Stack>
      <Typography>Server running on port: {port} </Typography>
      <Button variant="outlined" onClick={stopServer}>Stop server</Button>
    </Stack>
  )
}