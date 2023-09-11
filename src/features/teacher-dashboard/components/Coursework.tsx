import { Wrap, WrapItem } from '@chakra-ui/react'
import { FC } from 'react'

import { ActivityCard } from './ActivityCard'

import { Activity } from '@/types'

type CourseworkProps = {
  readonly activitiesInClass: Array<Activity>
}
export const Coursework: FC<CourseworkProps> = ({ activitiesInClass }) => {
  return (
    <Wrap justify="space-between" data-testid="activities-wrapper">
      {activitiesInClass.map((activity) => {
        return (
          <WrapItem key={activity.uuid} m="8px !important">
            <ActivityCard activity={activity} />
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
