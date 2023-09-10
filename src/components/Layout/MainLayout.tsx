import { Flex } from '@chakra-ui/react'
import React from 'react'

import { AppHeader } from '@/features/header'
import { SetUserType } from '@/hooks/useCurrentUser'
import { User } from '@/types'

type MainLayoutProps = {
  children: React.ReactNode
  context: { user: User; setUser: SetUserType }
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }: MainLayoutProps) => {
  return (
    <Flex display-name="main-layout-flex-container" direction="column">
      <AppHeader />
      <main>
        <Flex
          display-name="main-layout-children-flex-container"
          h="93vh"
          background="app.background"
          justify="center"
        >
          {children}
        </Flex>
      </main>
    </Flex>
  )
}
