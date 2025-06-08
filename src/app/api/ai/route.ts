import { type NextRequest } from "next/server";
import { streamText } from 'ai';
import { openrouter } from "@/ai/open-router";
import { tools } from '@/ai/tools';


export async function POST(request: NextRequest){
  const { messages } = await request.json()

  const result = streamText({
    model: openrouter.chat('openai/gpt-4o-2024-11-20'),
    tools,
    messages,
    system: `
      Sempre responda em markdown sem aspas no início ou fim da mensagem.
    `,
    maxSteps: 5,
  })

  return result.toDataStreamResponse()
}