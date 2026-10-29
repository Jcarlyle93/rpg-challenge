import type { Stats } from "../types/types"

export interface Character {
  name: string,
  level: number,
  xp: number,
  unspentPoints: number,
  stats: Stats
}

export interface Mission {
  name: string,
  description: string,
  requirements: Stats,
  xpReward: number
}

export interface SaveSlot {
  player: Character,
  Missions: Mission[]
}

export interface SaveData {
  slot1: SaveSlot | null,
  slot2: SaveSlot | null,
  slot3: SaveSlot | null
}