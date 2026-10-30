import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
            LVL: {slotData.player.level}
          </ListItem>
          <ListSubheader>{'Stats'}</ListSubheader>
          <ListItem >
            STR: {slotData.player.stats.strength}
          </ListItem>
          <ListItem >
            Dex: {slotData.player.stats.dexterity}
          </ListItem>
          <ListItem >
            INT: {slotData.player.stats.intellect}
          </ListItem>
          <ListItem >
            VIT: {slotData.player.stats.vitality}
          </ListItem>
          <ListItem >
            CHA: {slotData.player.stats.charisma}
          </ListItem>
        </List>
        <Button variant="contained" onClick={() => onStart(slotKey)}> Select Save </Button>
        </>
      ) : (
        <>
        <Typography variant="h5">
          Start New Game
        </Typography>
        <Divider />
        <p></p>
        <Button variant="contained" onClick={() => onStart(slotKey)}> New Game </Button>
        </>
      )}
    </Card>
  )
}