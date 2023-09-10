import { Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'

import { ActivityCard } from './ActivityCard'

import { useActivitiesInClassQuery } from '../apis/activitiesInClass.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { CLASS_ID } from '@/utils/constants'

export const Coursework: FC = () => {
  const { data, loading } = useActivitiesInClassQuery({
    variables: {
      classId: CLASS_ID,
    },
  })

  if (loading && !data) {
    return <SpinnerContainer />
  }

  return (
    <Wrap justify="space-between" data-testid="activities-wrapper">
      {data?.activitiesInClass.map((activity) => {
        return (
          <WrapItem key={activity.uuid} m="8px !important">
            <ActivityCard activity={activity} />
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
