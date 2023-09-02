import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { ModifyCloseFriends } from '../components/ModifyCloseFriends'
import { onDragEnd } from '../utils'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { ContentLayout } from '@/components/Layout'
import { GraphQLErrorMessage } from '@/features/auth'
// eslint-disable-next-line no-restricted-imports
import { useFriendsQuery } from '@/features/profiles/query.generated'
import { Friend } from '@/types'

export const CloseFriends: React.FC = () => {
  const [profiles, setProfiles] = useState<Array<Friend>>([])
  const [closeFriends, setCloseFriends] = useState<Array<Friend>>([])
  const { data, loading, error } = useFriendsQuery({
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!data) {
      return
    }
    const friends = data.friends

    setProfiles(friends)
  }, [data])

  if (error) {
    return <GraphQLErrorMessage error={error} testId="fetch-profiles-query-error" />
  }

  if (loading) {
    return <SpinnerContainer size="xl" />
  }
  return (
    <ContentLayout page="close-friends">
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd({ result, profiles, setProfiles, closeFriends, setCloseFriends })
        }
      >
        <ModifyCloseFriends profiles={profiles} closeFriends={closeFriends} />
      </DragDropContext>
    </ContentLayout>
  )
}
