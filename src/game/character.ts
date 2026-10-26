import type { Character } from "../interfaces/interfaces.ts"

export function createCharacter(name: string): Character {
  return{
    name: name,
    level: 1,
    xp: 0,
    unspentPoints: 0,
    stats: {
      strength: 1,
      intellect: 1,
      dexterity: 1,
      vitality: 1,
      charisma: 1,
    }
  }
}

export function calculateRequiredXp(level: number): number {
  if (level < 11) {
    return 40 * level * level + 360 * level
  } else if (level <= 27) {
    return -0.4 * Math.pow(level, 3) + 40.4 * Math.pow(level, 2) + 396 * level
  } else if (level <= 59) {
    return (65 * level * level - 165 * level - 6750) * 0.82
  }
  return 1000
}