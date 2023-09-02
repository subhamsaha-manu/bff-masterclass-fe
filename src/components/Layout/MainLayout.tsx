import { Flex } from '@chakra-ui/react'
import React from 'react'

import { Footer } from '@/features/Footer'
import { AppHeader } from '@/features/Header'
import { Sidebar } from '@/features/Sidebar'

type MainLayoutProps = {
  children: React.ReactNode
  context: any
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }: MainLayoutProps) => {
  return (
    <Flex display-name="main-layout-flex-container" direction="column">
      <Sidebar>
        <Flex
          p="5"
          justify="flex-end"
          bg="#0e1e25"
          display-name="header-flex-container"
          display={{ base: 'none', md: 'flex' }}
        >
          <Flex justify="center" display-name="header-flex-container-2">
            <AppHeader />
          </Flex>
        </Flex>
        <main>{children}</main>
        <Footer />
      </Sidebar>
    </Flex>
  )
}
