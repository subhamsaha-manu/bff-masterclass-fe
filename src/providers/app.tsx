import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, Flex, Heading, Text } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HashRouter } from 'react-router-dom'

import { getClient } from '@/apollo/client'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { CurrentUserProvider } from '@/context/CurrentUserProvider'
import customTheme from '@/utils/theme'

const ErrorFallback = () => {
  return (
    <Flex h="100vh" justify="center" alignItems="center" flexDirection="column">
      <Heading>Something Went Wrong!</Heading>
      <Text> We are sorry for the inconvenience. Please try again later.</Text>
    </Flex>
  )
}
type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Suspense fallback={<SpinnerContainer size="xl" />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HashRouter>
            <ApolloProvider client={getClient()}>
              <CurrentUserProvider>{children}</CurrentUserProvider>
            </ApolloProvider>
          </HashRouter>
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  )
}
