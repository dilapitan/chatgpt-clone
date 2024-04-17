export const getChatsByUser = async (id) => {
  const URL = `http://localhost:4000/chats/${id}`
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const responseJson = await response.json()
  return responseJson
}

export const createChat = async ({ chatPrompt, chatAllPrompt, user_id }) => {
  const URL = `http://localhost:4000/chats`
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatPrompt,
      chatAllPrompt,
      user_id,
    }),
  })

  const responseJson = await response.json()
  return responseJson
}
