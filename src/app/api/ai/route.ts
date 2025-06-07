import { NextResponse, type NextRequest } from "next/server";
import { generateObject, generateText, tool } from 'ai';
import { openrouter } from "@/ai/open-router";
import { z } from "zod";

export async function GET(request: NextRequest){
  // const result = await generateText({
  //   model: openrouter.chat('openai/chatgpt-4o-latest'),
  //   prompt: 'Traduza "Hello World!" para português.',
  //   system: 'você é uma AI especializada em tradução, sempre retorne da maneira mais sucinta possível'
  // })
  // return NextResponse.json({
  //   message: result.text
  // })

  // ------------------------------------

  // const result = await generateObject({
  //   model: openrouter.chat('openai/gpt-4o-2024-11-20'),
  //   schema: z.object({
  //     pt: z.string().describe('Tradução para português'),
  //     fr: z.string().describe('Tradução para francês'),
  //     es: z.string().describe('Tradução para espanhol')
  //   }),
  //   prompt: 'Traduza "Hello World!" para diferentes idiomas.',
  //   system: 'você é uma AI especializada em tradução, sempre retorne da maneira mais sucinta possível'
  // })

  // ------------------------------------

  const result = await generateText({
    model: openrouter.chat('openai/gpt-4o-2024-11-20'),
    tools: {
      profileAndUrls: tool({
        description: 'Essa ferramenta serve para buscar dados de um usuário no github ou acessar URLs da API para outras informações de um usuário como lista de organizações, repositórios,, eventos, seguidores etc.',
        parameters: z.object({
          username: z.string().describe('username do usuário no github')
        }),
        execute: async ({ username }) => {
          const response = await fetch(`https://api.github.com/users/${username}`)
          const data = await response.json()
          return JSON.stringify(data)
        }
      }),

      fetchHTTP: tool({
        description: 'Essa ferramenta serve para realizar um requisição HTTP em uma URL especificada e acessar sua resposta.',
        parameters: z.object({
          url: z.string().url().describe('URL a ser requisitada')
        }),
        execute: async ({ url }) => {
          const response = await fetch(url)
          const data = await response.text()
          return data
        }
      })
    },
    prompt: 'Me dê uma lista de usuários que seguem o hugo-wemer no Github?',
    maxSteps: 5,

    onStepFinish({ toolResults }){
      console.log(toolResults)
    }
  })

  return NextResponse.json({
    message: result.text,
    parts: result.toolCalls
  })
}