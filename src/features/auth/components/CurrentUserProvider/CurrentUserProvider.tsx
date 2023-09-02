import { noop } from 'lodash'
import React, { useState } from 'react'

import { useCurrentUserQuery } from '../queries.generated'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { GraphQLErrorMessage } from '@/features/auth'
import CurrentUserContext, { SetUserType } from '@/hooks/useCurrentUser'
import { User } from '@/types'

interface UserProviderPropTypes {
  children: React.ReactNode
}

export const CurrentUserProvider: React.FC<UserProviderPropTypes> = ({ children }) => {
  const [currentUserState, setCurrentUserState] = useState({
    user: {} as User,
    setUser: noop as SetUserType,
  })
  const { loading, error, data } = useCurrentUserQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  })

  if (error) {
    return <GraphQLErrorMessage testId="CurrentUserProvider" error={error} />
  }

  if (loading) {
    return <SpinnerContainer size="xl" />
  }

  if (!currentUserState.user?.uuid && data?.currentUser) {
    setCurrentUserState({ user: data.currentUser!, setUser: setCurrentUserState })
  }
  return (
    <CurrentUserContext.Provider value={currentUserState}> {children} </CurrentUserContext.Provider>
  )
}

export const CurrentUserConsumer = CurrentUserContext.Consumer
