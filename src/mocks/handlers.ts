// src/mocks/handlers.js
import { graphql } from 'msw'

export const handlers = [
  // Handles a "Login" mutation

  graphql.query('friends', (req, res, ctx) => {
    const { username } = req.variables

    sessionStorage.setItem('is-authenticated', username)

    return res(
      ctx.data({
        friends: [
          {
            uuid: '1',
            name: 'John Doe',
            birthday: 'johndoe',
            email: '',
            mobileNumber: '',
            avatar: '',
          },
        ],
      })
    )
  }),
]
