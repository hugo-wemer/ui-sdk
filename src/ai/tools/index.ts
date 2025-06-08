import { githubProfile } from "./github-profile";
import { httpFetch } from "./http-fetch";
import type { ToolCallUnion, ToolResultUnion } from 'ai'

export type AIToolSet = ToolCallUnion<typeof tools>
export type AIToolResult = ToolResultUnion<typeof tools>

export const tools = {
  githubProfile,
  httpFetch
}