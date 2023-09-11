import { Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { FC } from 'react'

import { Coursework } from './Coursework'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import { useTeacherDashboardQuery } from '@/features/teacher-dashboard/apis/teacherDashboard.generated'
import { ClassProgress } from '@/features/teacher-dashboard/components/ClassProgress'
import { CLASS_ID } from '@/utils/constants'

export const TeacherDashboard: FC = () => {
  const { data, loading } = useTeacherDashboardQuery({
    variables: {
      classId: CLASS_ID,
    },
  })

  if (loading && !data) {
    return <SpinnerContainer />
  }

  return (
    <ContentLayout pageTitle="teacher-dashboard">
      <Flex display-name="teacher-dashboard-heading" w="100%" align="center" p={1}>
        <Heading fontWeight="700" fontSize={{ base: '20px', xl: '30px' }} color="font.heading">
          Teacher Dashboard
        </Heading>
      </Flex>
      <Flex display-name="teacher-tabs-container">
        <Tabs isFitted variant="enclosed" w="100%">
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Coursework</Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }} data-testid="class-progress-tab">
              Class Progress
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0} pt={4}>
              <Coursework activitiesInClass={data!.activitiesInClass!} />
            </TabPanel>
            <TabPanel p={0} pt={4}>
              <ClassProgress activities={data!.activitiesInClass} students={data!.students} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ContentLayout>
  )
}
