import OpenAI from "openai"
import * as config from "../.config"

export const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
      {
          role: "user",
          content: "Give me a list of activity ideas based on my current location and weather"
      }
  ]
})

console.log(response.choices[0].message.content)