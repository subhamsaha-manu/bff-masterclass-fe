import { Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import StudentSVG from '@/assets/illustrations/student.svg'
import TeacherSVG from '@/assets/illustrations/teacher.svg'
import { ContentLayout } from '@/components/Layout/ContentLayout'

export const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <ContentLayout pageTitle="dashboard">
      <Flex gap={8} flexDir="column" h="100%">
        <Heading>Choose a journey</Heading>
        <Flex gap={8} display-name="journeys" mt="140px">
          <Flex display-name="teacher-journey" flexDir="column" w="50%" gap={4} align="center">
            <Flex
              borderRadius={8}
              h="285px"
              w="346px"
              border="1px solid #3C4852"
              background="#fdfdfd"
              boxShadow="0 8px 8px -4px lightblue"
              cursor="pointer"
              _hover={{ background: '#efe' }}
              onClick={() => navigate('/app/activities')}
            >
              <Image src={TeacherSVG} alt="teacher" />
            </Flex>
            <Heading color="primary.default" size="lg">
              Teacher Journey
            </Heading>
          </Flex>
          <Flex display-name="student-journey" flexDir="column" w="50%" gap={4} align="center">
            <Flex
              borderRadius={8}
              h="285px"
              w="346px"
              border="1px solid #3C4852"
              background="#fdfdfd"
              boxShadow="0 8px 8px -4px lightblue"
              cursor="pointer"
              _hover={{ background: '#efe' }}
            >
              <Image src={StudentSVG} alt="teacher" />
            </Flex>
            <Heading color="primary.default" size="lg">
              Student Journey
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    </ContentLayout>
  )
}
