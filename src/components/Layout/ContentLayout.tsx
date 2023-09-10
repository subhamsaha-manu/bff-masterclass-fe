import { Flex } from '@chakra-ui/react'
import React from 'react'

type ContentLayoutProps = {
  children: React.ReactNode
  pageTitle: string
}
export const ContentLayout: React.FC<ContentLayoutProps> = ({ children, pageTitle }) => {
  return (
    <Flex
      flexDir="column"
      p={{ base: '4px', xl: 4 }}
      gap={8}
      display-name={`${pageTitle}-content-layout-container`}
      w={{ base: '100%', xl: '80%' }}
      style={{
        color: '#485465',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 12px 20px 0 rgba(0,0,0,.05)',
        marginTop: '12px',
        marginBottom: '12px',
        padding: '24px',
        height: '93vh',
        overflowY: 'scroll',
      }}
    >
      {children}
    </Flex>
  )
}
