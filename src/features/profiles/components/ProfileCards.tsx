import { Divider, VStack } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'

import { ProfileCard } from './ProfileCard'

import { useFriendsQuery } from '../query.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { GraphQLErrorMessage } from '@/features/auth'
import { Friend } from '@/types'

export const ProfileCards: React.FC = () => {
  const [sortedProfiles, setSortedProfiles] = useState<Array<Friend>>([])
  const { data, loading, error } = useFriendsQuery({
    fetchPolicy: 'cache-and-network',
  })

  const distanceToBirthday = (date: any) => {
    const currDate: any = new Date()
    currDate.setHours(0, 0, 0, 0)
    const currYear = currDate.getFullYear()

    const offset = new Date()
    offset.setHours(0, 0, 0, 0)
    offset.setFullYear(currYear + 1)

    date = new Date(date + ' 00:00')
    date.setFullYear(currYear)

    const diff = date - currDate
    return diff < 0 ? diff + offset.getTime() : diff
  }
  const sortBasedOnBirthday = (friends: Array<Friend>) => {
    return friends
      .slice(0)
      .sort(
        (a: Friend, b: Friend) => distanceToBirthday(a.birthday) - distanceToBirthday(b.birthday)
      )
  }

  useEffect(() => {
    if (!data) {
      return
    }
    const friends = data.friends

    setSortedProfiles(sortBasedOnBirthday(friends))
  }, [data, sortBasedOnBirthday])

  if (error) {
    return <GraphQLErrorMessage error={error} testId="fetch-profiles-query-error" />
  }

  if (loading) {
    return <SpinnerContainer size="xl" />
  }

  return (
    <VStack spacing={8} align="stretch" w="95%" display-name="profile-cards-vstack-div">
      {sortedProfiles.map((profile, index) => (
        <Fragment key={profile?.uuid}>
          <ProfileCard key={`profile-card-${profile?.uuid}`} friend={profile} isEditable />
          {index !== sortedProfiles.length - 1 && <Divider key={`avatar-image-${profile?.uuid}`} />}
        </Fragment>
      ))}
    </VStack>
  )
}
