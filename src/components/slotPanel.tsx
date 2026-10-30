import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { SaveData, SaveSlot } from '../interfaces/interfaces';
import { Divider, List, ListItem, ListSubheader } from '@mui/material';

export function SlotPanel({ slotKey, slotData, onStart }: { slotKey: string, slotData: SaveSlot | null, onStart: (slotKey:string) => void }) {
  return(
    <Card>
      {slotData ? (
        <>
          <Typography variant="h5">
            {slotKey}
          </Typography>
          <Divider />
          <List>
            <ListItem >
              Name: {slotData.player.name}
            </ListItem>
            <ListItem >
              LEVEL: {slotData.player.level}
            </ListItem>
            <ListSubheader>{'Stats'}</ListSubheader>
            {Object.entries(slotData.player.stats).map(([statName, statValue]) => 
              <ListItem key={statName}>
                  {statName.toUpperCase()}: {statValue}
              </ListItem>
            )}
          </List>
          <Button variant="contained" onClick={() => onStart(slotKey)}> Select Save </Button>
          <p>-</p>
        </>
      ) : (
        <>
        <Typography variant="h5">
          Start New Game
        </Typography>
        <Divider />
        <p></p>
        <Button variant="contained" onClick={() => onStart(slotKey)}> New Game </Button>
        <p>-</p>
        </>
      )}
    </Card>
  )
}