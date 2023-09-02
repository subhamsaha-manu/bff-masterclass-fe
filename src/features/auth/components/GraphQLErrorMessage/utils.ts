import { ApolloError } from '@apollo/client'

export function getGQLErrorMessages(error: ApolloError) {
  if (!error) {
    return []
  }
  const { graphQLErrors, networkError } = error
  const messages = [...graphQLErrors].map((errorObj) => {
    return errorObj?.extensions?.traceId
  })
  if (networkError?.message) {
    messages.push(networkError.message)
  }
  return messages
}
