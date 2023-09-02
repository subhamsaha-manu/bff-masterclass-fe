import { Box, Flex, Heading, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type LayoutProps = {
  children: React.ReactNode
  headerText?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, headerText }: LayoutProps) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>{headerText}</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Link href="/faq" color={'blue.400'}>
              features
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          {children}
        </Box>
      </Stack>
    </Flex>
  )
}
