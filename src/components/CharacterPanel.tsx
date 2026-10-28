import type { Character } from '../interfaces/interfaces'
import { calculateRequiredXp } from '../game/character';
import type { Stat } from '../types/types';

//MUI
import { Button, Container, TextField } from '@mui/material';


export function CharacterPanel ({ player, onStatIncrease, onNameChange } : { player: Character, onStatIncrease: (stat: Stat) => void, onNameChange: (name:string)=>void}) {
  
  return (
    <Container maxWidth="sm">
      <TextField id="outlined-basic" variant="outlined" value={player.name} onChange={(e) => onNameChange(e.target.value)}/>
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