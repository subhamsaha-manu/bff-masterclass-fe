import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'

import { storage } from '@/utils/storage'

console.log(`NODE_ENV set to: `, process.env.NODE_ENV)
const isProduction = process.env.NODE_ENV === 'production'
//const isProduction = false

const httpLink = createHttpLink({
  uri: isProduction
    ? 'https://birthday-reminder-backend.herokuapp.com/graphql'
    : 'http://localhost:9006/graphql',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${storage.getToken()}` || null,
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
