export const login = async ({ email, password }) => {
  const URL = `http://localhost:4000/login`
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const responseJson = await response.json()
  return responseJson
}
