'use client'

import { useState } from 'react'

const GOOGLE_GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY

const TRAINING_PROMPT = [
  {
    role: 'user',
    parts: [
      {
        text: "This is Introductory dialogue for any prompt :  'Hello, my dear friend, I am the CHATGPT Bot. Ask me anything regarding procurement, purchase, and logistics. I will be happy to help you. '",
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: 'okay',
      },
    ],
  },
  {
    role: 'user',
    parts: [
      {
        text: "Special Dialogue 1 : if any prompt mentions 'Shashi Shahi' word :  'Ofcourse! Dr. Shashi Shahi is one of the prominent professors at UWindsor! He is an IIT-D alumni with year of invaluable experience and a fun way of engaging in lectures!' 'Likes: Analytics and Research and Case Studies ''Dislikes: Students near riverside.'",
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: 'okay',
      },
    ],
  },
  {
    role: 'user',
    parts: [
      {
        text: "Special Dialogue 2 : Any prompt that mentions CHATGPT class / classroom  A : ' The CHATGPT Batch of 2023 is by far the best the university has ever seen by all sets of standards. Students from different come together to form a truly diverse and culturally rich classroom experience. I believe that all students are highly capable and will achieve all great things in their professional career!' ",
      },
    ],
  },
  {
    role: 'model',
    parts: [
      {
        text: 'okay',
      },
    ],
  },
]
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_GEMINI_API_KEY}`

const Main = () => {
  const [prompt, setPrompt] = useState('')
  const [allPrompts, setAllPrompts] = useState([])
  const [isSent, setIsSent] = useState(true)

  const handleChangePrompt = (e) => {
    setPrompt(e.target.value)
  }

  const sendPrompt = async () => {
    setIsSent(false)

    const promptsToSend = [
      ...TRAINING_PROMPT,
      ...allPrompts,
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ]

    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: promptsToSend }),
    })

    const responseJson = await response.json()
    // console.log('responseJson:', responseJson)

    const responsePrompt = responseJson.candidates[0].content.parts[0].text

    const newAllPrompts = [
      ...allPrompts,
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: responsePrompt,
          },
        ],
      },
    ]

    // console.log('newAllPrompts:', newAllPrompts)
    setAllPrompts(newAllPrompts)
    setPrompt('')
    setIsSent(true)
  }

  return (
    <div className="p-5">
      <div>Main</div>

      <textarea onChange={handleChangePrompt} />
      <button>Send</button>
    </div>
  )
}

export default Main
