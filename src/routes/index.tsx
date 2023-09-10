import { useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'

import { Landing } from '@/features/common'
import { IS_AUTHENTICATED } from '@/utils/constants'
import { storage } from '@/utils/storage'

export const AppRoutes = () => {
  const isAuthenticated = storage.getItem(IS_AUTHENTICATED)
  const commonRoute = [
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '*',
      element: <Landing />,
    },
  ]

  const routes = isAuthenticated ? protectedRoutes : []

  const element = useRoutes([...routes, ...commonRoute])
  return <>{element}</>
}
