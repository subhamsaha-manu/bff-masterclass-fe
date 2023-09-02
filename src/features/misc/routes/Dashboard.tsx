import { Box, Container, Fade, Flex, Heading, Icon, useDisclosure } from '@chakra-ui/react'
import { FcFilledFilter } from 'react-icons/all'

import { ContentLayout } from '@/components/Layout/ContentLayout'
import { Filter } from '@/features/Filter'
import { ProfileCards } from '@/features/profiles'
import { useSetState } from '@/hooks/useSetState'

type FilterState = {
  profileName: string
  birthdayMonth: string
}
export const Dashboard = () => {
  const { isOpen, onToggle } = useDisclosure()

  const [filterState, setFilterState] = useSetState<FilterState>({
    profileName: '',
    birthdayMonth: '',
  })
  return (
    <ContentLayout page="dashboard">
      <Flex
        display-name="dashboard-filter"
        position="relative"
        bottom="300px"
        left="40px"
        zIndex="5"
        bg="#011627"
        w={10}
        h={10}
        justifyContent="center"
        alignItems="center"
        shadow="2px 1px #8f8f66,-.2em 0 .4em #8f8f66"
      >
        <Icon as={FcFilledFilter} w={8} h={8} cursor="pointer" onClick={onToggle} />
      </Flex>
      <Fade in={isOpen}>
        <Box
          p="20px"
          color="white"
          mt="2"
          bg="#011627"
          rounded="md"
          shadow="md"
          position="relative"
          bottom="170px"
        >
          <Filter setFilterState={setFilterState} filterState={filterState} />
        </Box>
      </Fade>
      <Container
        bg={'#011627'}
        color={'#fff'}
        w="95%"
        minH="70vh"
        maxH="70vh"
        mt={{ base: 4, md: 10 }}
        mb={{ base: 4, md: 10 }}
        p={{ base: 2, md: 10 }}
        zIndex="3"
        borderRadius="2%"
        shadow="2px 1px #8f8f66,-.2em 0 .4em #8f8f66"
        display-name="dashboard-container"
        overflow="scroll"
      >
        <Flex w="100%" justify="center" align="center" p="4">
          <Heading>Upcoming Birthdays!!</Heading>
        </Flex>
        <Flex w="100%" justify="center" align="center" mt="10">
          <ProfileCards />
        </Flex>
      </Container>
    </ContentLayout>
  )
}
