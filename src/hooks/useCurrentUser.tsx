import _, { noop } from 'lodash'
import React, { useContext } from 'react'

import { User } from '@/types'

const CurrentUserContext = React.createContext({
  user: {} as User,
  setUser: noop as SetUserType,
})

export default CurrentUserContext

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext)
  if (_.isNil(context)) {
    throw new Error('useCurrentUser must be used within a CurrentUserContext.Provider')
  }
  return context.user
}

export type SetUserType = React.Dispatch<React.SetStateAction<{ user: User; setUser: SetUserType }>>
