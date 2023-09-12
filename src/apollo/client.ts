import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'

import { USER_TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

console.log(`NODE_ENV set to: `, process.env.NODE_ENV)

const httpLink = createHttpLink({
  uri: 'http://localhost:9006/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${storage.getItem(USER_TOKEN)}` || null,
    },
  })

  return forward(operation)
})

export const getClient = () => {
  return new ApolloClient({
    link: ApolloLink.from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  })
}
