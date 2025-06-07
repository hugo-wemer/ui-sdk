import { NextResponse, type NextRequest } from "next/server";
import { generateObject, generateText } from 'ai';
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

  const result = await generateObject({
    model: openrouter.chat('openai/gpt-4o-2024-11-20'),
    schema: z.object({
      pt: z.string().describe('Tradução para português'),
      fr: z.string().describe('Tradução para francês'),
      es: z.string().describe('Tradução para espanhol')
    }),
    prompt: 'Traduza "Hello World!" para diferentes idiomas.',
    system: 'você é uma AI especializada em tradução, sempre retorne da maneira mais sucinta possível'
  })

  return NextResponse.json({
    message: result.object
  })
}