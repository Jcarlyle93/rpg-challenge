import type { Mission } from "../interfaces/interfaces.ts";
import { generateMissionName } from "../services/groq.ts";

export async function generateMission(playerLevel: number): Promise<Mission> {
  const playerToStats = (5 + playerLevel)
  const budget = Math.round(playerToStats * 1.1)
  
  const cut1 = Math.floor(Math.random() * (budget + 1))
  const cut2 = Math.floor(Math.random() * (budget + 1))
  const cut3 = Math.floor(Math.random() * (budget + 1))
  const cut4 = Math.floor(Math.random() * (budget + 1))

  const cuts = [cut1, cut2, cut3, cut4].sort((a, b) => a - b)

  const strength = Math.min(cuts[0], 10)
  const dexterity = Math.min(cuts[1] - cuts[0], 10)
  const intellect = Math.min(cuts[2] - cuts[1], 10)
  const vitality = Math.min(cuts[3] - cuts[2], 10)
  const charisma = Math.min(budget - cuts[3], 10)

  const requirements = {
    strength: strength,
    dexterity: dexterity,
    intellect: intellect,
    vitality: vitality,
    charisma: charisma
  }

  const { name, description } = await generateMissionName(requirements)

  return {

    name,
    description,
    xpReward: 50 * playerLevel,
    requirements
  }
}