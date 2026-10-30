import { Grid, Skeleton, Box, Typography, Button } from '@mui/material';
import type { SaveData, SaveSlot } from '../interfaces/interfaces';
import { SlotPanel } from  './slotPanel.tsx'

export function HomeScreen({ onStart, SaveData }: { onStart: (slotKey: string) => void, SaveData: SaveData} ) {
  const title = "ReactPlayingGame Self Learning"
  
  const savedGamesList = Object.entries(SaveData).map(([slotKey, slotData]) => (
    <Grid key={slotKey} size={4}>
      <SlotPanel
        slotKey={slotKey}
        slotData={slotData}
        onStart={onStart}
      />
    </Grid>
  ));
  
  return (
    <Box>
      <Typography variant="h2" gutterBottom>{title}</Typography>
      <p> Welcome to my little project. After years spent in Angular, I've decided to spend some personal development time in react.</p>
      <p> Although I do Agree AI can be a powerful tool for Devs, I feel it's important for devs to have a good understanding of the busines logic,
        therefore, this project was created the old fasioned way. React docs, google and good old stack overflow.
      </p>
      <p>_</p>
      <Grid container wrap="nowrap" spacing={2}>
        {savedGamesList}
      </Grid>
    </Box>
  )
}