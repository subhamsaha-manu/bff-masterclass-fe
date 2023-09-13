import { Flex, Heading } from '@chakra-ui/react'
import { FC } from 'react'

import { useActivitiesInClassQuery } from '../apis/activitiesInClass.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import { CLASS_ID } from '@/utils/constants'

export const Activities: FC = () => {
  const { data: activitiesData, loading: activitiesLoading } = useActivitiesInClassQuery({
    variables: {
      classId: CLASS_ID,
    },
  })

  if (activitiesLoading) {
    return <SpinnerContainer />
  }

  return (
    <ContentLayout pageTitle="activities">
      <Flex display-name="activities-container">
        <Heading>Activities</Heading>

        {activitiesData?.activitiesInClass.map((activity) => (
          <Flex key={activity.uuid}>{activity.name}</Flex>
        ))}
      </Flex>
    </ContentLayout>
  )
}
