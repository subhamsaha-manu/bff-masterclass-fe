import { ApolloError } from '@apollo/client'
import { Flex, Heading, Text } from '@chakra-ui/react'

import { getGQLErrorMessages } from './utils'

type GraphQLErrorMessageProps = {
  error: ApolloError
  testId?: string
}

export const GraphQLErrorMessage = ({ error, testId }: GraphQLErrorMessageProps) => {
  const traceIds = getGQLErrorMessages(error)
  traceIds
    .filter((traceId) => traceId?.includes('No more mocked responses for the'))
    .forEach((traceId) => {
      console.warn(traceId)
    })
  return (
    <Flex
      h="100vh"
      justify="center"
      alignItems="center"
      flexDirection="column"
      data-testid={testId}
    >
      <Heading>Something Went Wrong!</Heading>
      <Text> Please contact Support</Text>
    </Flex>
  )
}
