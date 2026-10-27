import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
})

export async function generateMissionName(stats: {
  strength: number,
  dexterity: number,
  intellect: number,
  vitality: number,
  charisma: number
}): Promise<{name: string, description: string}> {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Generate a short RPG mission name and one-sentence description based on these stat requirements: STR ${stats.strength}, DEX ${stats.dexterity}, INT ${stats.intellect}, VIT ${stats.vitality}, CHA ${stats.charisma}. Respond with JSON: {"name": "...", "description": "..."}`
      }
    ],
    model: 'openai/gpt-oss-20b',
  })

  return JSON.parse(response.choices[0].message.content || "{}")
}