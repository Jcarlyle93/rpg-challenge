import { useEffect, useState } from 'react'
import { createCharacter, calculateRequiredXp } from './game/character.ts'
import { generateMission } from "./game/mission.ts"

//custom components
import { CharacterPanel } from './components/CharacterPanel.tsx'
import { MissionCard } from './components/MissionCard.tsx'
import { ActiveMission } from './components/ActiveMission.tsx'
import { HomeScreen } from './components/HomeScreen.tsx'

//types
import type { Character, Mission, SaveData, SaveSlot } from './interfaces/interfaces.ts'
import type { Stat } from './types/types.ts'

//MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


//styles
import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App() {

  //useStates
  const[screen, setScreen] = useState('home')

  const [saveData, setSaveData] = useState<SaveData>(() => {
    const saved = localStorage.getItem('saveSlots')
    if (saved)
      return JSON.parse(saved)
    return { slot1: null, slot2: null, slot3: null }
  })

  const [missions, setMissions] = useState<Mission[]>([])

  const [activeMission, setActiveMission] = useState<Mission | null>(null)

  const [player, setPlayer] = useState<Character | null>(null)

  //useEffects
  useEffect(() => {
    localStorage.setItem('player', JSON.stringify(player))
  }, [player])

  useEffect(()=> {
    if (missions.length > 0) {
      localStorage.setItem('missions', JSON.stringify(missions))
    }
  }, [missions])
  
  useEffect(() => {
    async function loadMissions() {
      if(!player) return
      const saved = localStorage.getItem('missions')
      if (saved) {
        setMissions(JSON.parse(saved))
      } else {
        const newMissions = await Promise.all([
          generateMission(player.level),
          generateMission(player.level),
          generateMission(player.level)
        ])
        setMissions(newMissions)
      }
    }

    loadMissions()
  }, [player])

  useEffect(() => {
  if(!player) return
  const xpRequired = calculateRequiredXp(player.level)
    if (player.xp >= xpRequired) {
      setPlayer({
        ...player,
        xp: player.xp - xpRequired,
        level: player.level + 1,
        unspentPoints: player.unspentPoints + 1
      })
    }
  }, [player])

  useEffect(()=> {
    localStorage.setItem('saveSlots', JSON.stringify(saveData))
  }, [saveData])

  //funcs
  function handleAttemptMission(mission: Mission) {setActiveMission(mission)}
  
  function handleStatIncrease(stat: Stat){
    if(!player) return
    if (player.unspentPoints > 0 && player.stats[stat] < 10) {
      setPlayer({
        ...player,
        unspentPoints: player.unspentPoints - 1,
        stats: {
          ...player.stats,
          [stat] : player.stats[stat] + 1
        }
      })
    }
  }

  function loadSaveSlot(slotKey: string) {
    const slot = saveData[slotKey as keyof SaveData]
    if(slot) {
      setPlayer(slot.player)
      setMissions(slot.Missions)
    } else {
      const newCharacter = createCharacter("Unamed Hero")
      setPlayer(newCharacter)
      setSaveData({
        ...saveData,
        [slotKey]: {
          player: newCharacter,
          Missions: []
        }
      })
    }
  }

  if(!player){
    return (
      <Container>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <HomeScreen onStart={(slotKey)=> {
            console.log("slotkey="+slotKey)
            loadSaveSlot(slotKey)
            setScreen('game')
          }}
          SaveData={saveData}
        />
        </ThemeProvider>
      </Container>
    )
  }

  return (
    <Container>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <CharacterPanel player={player} onStatIncrease={handleStatIncrease} onNameChange={(name) => setPlayer({...player, name})}/>
    
        {activeMission === null ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h2" gutterBottom>
              Avaliable Missions
            </Typography>
            <Grid container spacing={2}>
              {missions.map((mission, index) => (
                <Grid size={4} key={index}>
                  <MissionCard mission={mission} stats={player.stats} onAttempt={handleAttemptMission}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            Mission in progress
            <ActiveMission 
              mission={activeMission}
              player={player}
              onComplete={async (success: boolean) => {

                if(!player) return
                const xpEarned = success ? activeMission!.xpReward : 0
                
                setPlayer({
                  ...player,
                  xp: player.xp + xpEarned
                })
              
                const newMission = await generateMission(player.level)

                setMissions(missions.map(m =>
                  m === activeMission ? newMission : m
                ))
                setActiveMission(null)
              }} 
            />
          </Box>
        )}
      </ThemeProvider>
    </Container>
  )

}

export default App
