export const getUser = (accessToken) =>
  fetch(
    'https://www.googleapis.com/userinfo/v2/me',
    {
      access_token: accessToken
    }
  ).then(({ id, name, email, picture }) => ({
    service: 'google',
    picture,
    id,
    name,
    email
  }))
