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