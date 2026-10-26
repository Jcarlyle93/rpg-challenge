import { useEffect, useState } from "react";

import type { Character, Mission } from "../interfaces/interfaces";

//mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { combatResolver } from "../game/combat";
import { Button } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

export function ActiveMission({
  mission,
  player,
  onComplete
}: {
  mission: Mission,
  player: Character,
  onComplete: (success: boolean) => void
}) {

  const MISSION_DURATION = 5
  const [result, setResult] = useState<boolean | null>(null)
  const [timeLeft, setTimeLeft] = useState(MISSION_DURATION)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft === 0 && result === null) {
      const success = combatResolver(player, mission)
      setResult(success)
    }
  }, [timeLeft])

  return (
    <Container>
      <Typography variant="h5" gutterBottom>{mission.name}</Typography>
      {result === null ? (
        <>
          <p>Time Remaining: {timeLeft}</p>
          <LinearProgress variant="determinate" value={((MISSION_DURATION - timeLeft) / MISSION_DURATION )* 100}/>
        </>
      ):(
        <>
          <p>{result ? "Successful" : "Failed"}</p>
          <Button onClick={() => onComplete(result)}>Continue</Button>
        </>
      )} 
    </Container>
  )
}