import { Flex, Heading, Image, Progress } from '@chakra-ui/react'
import { FC } from 'react'

import ActivitySVG from '@/assets/illustrations/activity.svg'
import { Activity } from '@/types'

type ActivityCardProps = {
  readonly activity: Activity
}
export const ActivityCard: FC<ActivityCardProps> = ({
  activity: { description, name, completionPercentage },
}) => {
  return (
    <Flex
      display-name="activity-card"
      align="center"
      flexDir="column"
      w="300px"
      border="2px solid #ecedef"
      borderRadius="8px"
    >
      <Flex display-name="activity-card-image" w="100%">
        <Image src={ActivitySVG} alt="activity" />
      </Flex>
      <Flex display-name="activity-card-details" w="100%" flexDir="column">
        <Flex
          display-name="activity-card-name-description"
          w="100%"
          flexDir="column"
          gap="8px"
          h="50px"
          borderBottom="1px solid #ecedef"
          p={2}
          pb="50px"
        >
          <Heading fontWeight="400" fontSize="16px" color="font.heading">
            {name}
          </Heading>
          <Heading fontWeight="400" fontSize="12px" color="font.heading">
            {description}
          </Heading>
        </Flex>
        <Flex display-name="activity-completion-section" w="100%" gap="8px" p={4}>
          <Progress hasStripe value={completionPercentage} w="100%" />
        </Flex>
      </Flex>
    </Flex>
  )
}
