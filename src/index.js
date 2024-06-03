import { getCurrentLocation, getCurrentWeather } from "./tools"

const availableFunctions = {
  getCurrentLocation,
  getCurrentWeather
}

// Idea of system prompt: https://til.simonwillison.net/llms/python-react-pattern
const systemPrompt = `
You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer.
Your final answer should be highly specific to the observations you have from running the actions.
1. Thought: Describe your thoughts about the question you have been asked.
2. Action: run one of the actions available to you - then return PAUSE.
3. PAUSE
4. Observation: will be the result of running those actions.

Available actions:
- getCurrentWeather: 
    E.g. getCurrentWeather: Salt Lake City
    Returns the current weather of the location specified.
- getCurrentLocation:
    E.g. getCurrentLocation: null
    Returns user's location details. No arguments needed.

Example session:
Question: Please give me some ideas for activities to do this afternoon.
Thought: I should look up the user's location so I can give location-specific activity ideas.
Action: getLocation: null
PAUSE

You will be called again with something like this:
Observation: "New York City, NY"

Then you loop again:
Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
Action: getCurrentWeather: New York City
PAUSE

You'll then be called again with something like this:
Observation: { location: "New York City, NY", forecast: ["sunny"] }

You then output:
Answer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>
`

async function agent(query) {
  const messages = [
    { role:"system", content: systemPrompt },
    { role:"user", content:query }
  ]
  const MAX_ITERATIONS = 5
  const actionRegex = /^Action: (\w+): (.*)$/

  try {
    for(let i = 0; i < MAX_ITERATIONS; i++){
      console.log(`Iteration #${i + 1}`)

      // Make Request to OpenAI (Cloudflare Worker)
      // Caching is handled by the worker using AI Gateway from Cloudflare
      const OPENAI_WORKER_URL = 'https://openai-api-worker.brauliopf.workers.dev/'
      const response = await fetch(OPENAI_WORKER_URL, {
          method: 'POST',
          header: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ // as defined in the header, the body must be of type JSON
            model: 'gpt-3.5-turbo',
            messages: messages
          })
      })
      
      // Get Response
      if(!response.ok) { throw new Error(`Worker error: ${response_json.error}`) }
      const response_json = await response.json()

      // Process Response (if action required, go get action)
      messages.push({ role: "assistant", content: response_json.content}) // Add message to conversation log
      const textResponse = response_json.content // decide what to do

      // identify an action (assume there is an action <-- TODO: MUST handle this)
      const textLines = await textResponse.split("\n")
      const matchedStr = await textLines.find(str => actionRegex.test(str))
      console.log('textLines', textLines)
      console.log('matched', matchedStr)
      if(matchedStr){
        const action = actionRegex.exec(matchedStr)
    
        if(!availableFunctions.hasOwnProperty(action[1])){
          throw new Error(`Unknwon action: ${action[1]}: ${action[2]}`)
        }
    
        // execute action (add outpout to log of messages)
        const additional_info = await availableFunctions[action[1]](action[2])
        console.log(`add_info: ${additional_info}`)
        messages.push({role: "assistant", content: `Additional Info: ${additional_info}`})
        console.log(additional_info)
      } else {
        console.log("Agent finished with task")
        return textResponse
      }
      

    }
    console.log(messages)

  } catch(error) {
    console.error('There was a problem with the fetch operation. Error: ', error);
  }
}

agent("What is current weather?")
// agent("You dont need to know location or weather for this. Just tell me my name?")

// NOT RETURNING AN ERROR <--- SO WHAT?