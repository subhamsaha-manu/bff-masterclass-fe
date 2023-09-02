import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, Flex, Heading, Text } from '@chakra-ui/react'
import React, { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import { getClient } from '@/apollo/client'
import { SpinnerContainer } from '@/components/elements/Spinner'
import { Auth0ProviderWithHistory, CurrentUserProvider } from '@/features/auth'
// eslint-disable-next-line no-restricted-imports
import { authContext } from '@/features/auth/components/authContext'
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
  const [authenticated, setAuthenticated] = useState(false)
  return (
    <ChakraProvider theme={customTheme}>
      <Suspense fallback={<SpinnerContainer size="xl" />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BrowserRouter>
            <Auth0ProviderWithHistory>
              <ApolloProvider client={getClient()}>
                <authContext.Provider value={{ authenticated, setAuthenticated }}>
                  <CurrentUserProvider>{children}</CurrentUserProvider>
                </authContext.Provider>
              </ApolloProvider>
            </Auth0ProviderWithHistory>
          </BrowserRouter>
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  )
}
