import type { Character, Mission } from "../interfaces/interfaces";

function calculateSuccessChance(player: Character, mission: Mission): number {
  const strRatio = mission.requirements.strength === 0 ? 1 : Math.min(player.stats.strength / mission.requirements.strength, 1)
  const dexRatio = mission.requirements.dexterity === 0 ? 1 : Math.min(player.stats.dexterity / mission.requirements.dexterity, 1)
  const intRatio = mission.requirements.intellect === 0 ? 1 : Math.min(player.stats.intellect / mission.requirements.intellect, 1)
  const vitRatio = mission.requirements.vitality === 0 ? 1 : Math.min(player.stats.vitality / mission.requirements.vitality, 1)
  const chaRatio = mission.requirements.charisma === 0 ? 1 : Math.min(player.stats.charisma / mission.requirements.charisma, 1)

  const successChance = (strRatio + dexRatio + intRatio + vitRatio + chaRatio) / 4

  return successChance
}

export function combatResolver(player: Character, mission: Mission) : boolean {
  const successChance = calculateSuccessChance(player, mission)
  return Math.random() < successChance
}