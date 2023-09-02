import { Flex } from '@chakra-ui/react'
import React from 'react'

type ContentLayoutProps = {
  children: React.ReactNode
  page: string
}
export const ContentLayout: React.FC<ContentLayoutProps> = ({ children, page }) => {
  return (
    <Flex
      w="100%"
      minH={'80vh'}
      justify="center"
      align="center"
      display-name={`container-for-${page}`}
    >
      {children}
    </Flex>
  )
}
