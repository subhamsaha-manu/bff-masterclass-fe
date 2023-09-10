import { Container, Heading, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { IS_AUTHENTICATED } from '@/utils/constants'
import { storage } from '@/utils/storage'

export const LandingContent = () => {
  const navigate = useNavigate()
  const isAuthenticated = storage.getItem(IS_AUTHENTICATED)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app')
    }
  }, [isAuthenticated, navigate])

  return (
    <Container maxW="5xl">
      <Stack
        textAlign="center"
        align="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 8, md: 10 }}
        h="90vh"
        justifyContent="center"
      >
        <Heading fontWeight={600} fontSize="6xl" lineHeight="110%">
          Backend For Frontend
        </Heading>
        <Heading fontWeight={600} fontSize="3xl" lineHeight="110%" color="orange.400">
          Masterclass
        </Heading>
      </Stack>
    </Container>
  )
}
