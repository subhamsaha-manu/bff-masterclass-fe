import { graphql } from 'msw'

import { anUser } from '@/factories/anUser'

export const currentUserHandler = [
  graphql.query('currentUser', (_req, res, ctx) => {
    return res(
      ctx.data({
        currentUser: anUser.build(),
      })
    )
  }),
]
