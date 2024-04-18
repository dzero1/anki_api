export const getUser = (accessToken) =>
  fetch(
    'https://graph.facebook.com/me',
    {
      access_token: accessToken,
      fields: 'id, name, email, picture'
    }
  ).then(({ id, name, email, picture }) => ({
    service: 'facebook',
    picture: picture.data.url,
    id,
    name,
    email
  }))
