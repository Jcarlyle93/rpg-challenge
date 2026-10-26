import type { Character } from '../interfaces/interfaces'
import { calculateRequiredXp } from '../game/character';
import type { Stat } from '../types/types';

//MUI
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';


export function CharacterPanel ({ player, onStatIncrease } : { player: Character, onStatIncrease: (stat: Stat) => void}) {
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>{player.name}</Typography>
      <p>Level: {player.level}</p>
      <p>Xp: {player.xp} / {calculateRequiredXp(player.level)}</p>
      <ul>stats: 
        { player.unspentPoints > 0 ? (
          <>
          <li>Str: {player.stats.strength} <Button variant="contained" onClick={()=> onStatIncrease('strength')}>+</Button></li>
          <li>Dex: {player.stats.dexterity} <Button variant="contained" onClick={()=> onStatIncrease('dexterity')}>+</Button></li>
          <li>Int: {player.stats.intellect} <Button variant="contained" onClick={()=> onStatIncrease('intellect')}>+</Button></li>
          <li>Int: {player.stats.vitality} <Button variant="contained" onClick={()=> onStatIncrease('vitality')}>+</Button></li>
          <li>Cha: {player.stats.charisma} <Button variant="contained" onClick={()=> onStatIncrease('charisma')}>+</Button></li>
          </>
        ):(
          <>
          <li>Str: {player.stats.strength}</li>
          <li>Dex: {player.stats.dexterity}</li>
          <li>Int: {player.stats.intellect}</li>
          <li>vit: {player.stats.vitality}</li>
          <li>Cha: {player.stats.charisma}</li>
          </>
        )}
      </ul>
    </Container>

  )
}