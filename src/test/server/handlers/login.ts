import { graphql } from 'msw'

export const loginHandler = [
  graphql.query('login', (_req, res, ctx) => {
    return res(
      ctx.data({
        token: 'token',
        code: 'code',
        message: 'message',
        name: 'name',
      })
    )
  }),
]
