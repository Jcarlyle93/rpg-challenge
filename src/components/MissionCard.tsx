import type { Mission } from "../interfaces/interfaces.ts";
import type { Stats } from "../types/types.ts";

//mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


//charts
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from 'recharts'

export function MissionCard ({
  mission,
  stats,
  onAttempt
}: {
  mission: Mission,
  stats: Stats,
  onAttempt: (mission: Mission) => void
}) {
  const data = [
    { stat: 'STR', mission: mission.requirements.strength, player: stats.strength},
    { stat: 'DEX', mission: mission.requirements.dexterity, player: stats.dexterity },
    { stat: 'INT', mission: mission.requirements.intellect, player: stats.intellect },
    { stat: 'VIT', mission: mission.requirements.vitality, player: stats.vitality },
    { stat: 'CHA', mission: mission.requirements.charisma, player: stats.charisma }
  ]

  return(
    <Box>
      <Typography variant="h5" gutterBottom>{mission.name}</Typography>
      <p>description: {mission.description}</p>
      <p> Reward: {mission.xpReward}</p>
      Difficulty
      <RadarChart width={350} height={350} outerRadius="70%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="stat" />
        <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false}/>
        <Radar dataKey="mission" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}></Radar>
        <Radar dataKey="player" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4}></Radar>
      </RadarChart>
      <Stack spacing="2" direction="row">
        <Button variant="contained" onClick={() => onAttempt(mission)}>Attempt</Button>
      </Stack>
    </Box>
  )
}