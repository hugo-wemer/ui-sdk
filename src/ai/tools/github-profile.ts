import { github } from "@/lib/octokit"
import { tool } from "ai"
import { setTimeout } from "node:timers/promises"
import { z } from "zod"

export const githubProfile =  tool({
  description: 'Essa ferramenta serve para buscar dados de um usuário no github ou acessar URLs da API para outras informações de um usuário como lista de organizações, repositórios,, eventos, seguidores etc.',
  parameters: z.object({
    username: z.string().describe('username do usuário no github')
  }),
  execute: async ({ username }) => {
    await setTimeout(2000)
    const response = await github.users.getByUsername({username})
    return response.data
  }
})