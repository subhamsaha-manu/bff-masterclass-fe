import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { USER_TOKEN } from '@/utils/constants'
import { storage } from '@/utils/storage'

console.log(`NODE_ENV set to: `, process.env.NODE_ENV)
const isProduction = process.env.NODE_ENV === 'production'
//const isProduction = false

const httpLink = createHttpLink({
  uri: isProduction
    ? 'https://birthday-reminder-backend.herokuapp.com/graphql'
    : 'http://localhost:9006/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/subscriptions',
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

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
    link: ApolloLink.from([authMiddleware, splitLink]),
    cache: new InMemoryCache(),
  })
}
