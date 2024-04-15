const trainingPrompt = [
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
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY}`

const chatToGoogleGemini = async (allPrompts, prompt) => {
  const promptsToSend = [
    ...trainingPrompt,
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

  const responseJSON = await response.json()
  const responseMessage = responseJSON.candidates[0].content.parts[0].text
  return responseMessage
}

export default chatToGoogleGemini
