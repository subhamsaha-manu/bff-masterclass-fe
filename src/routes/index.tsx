import { isEmpty } from 'lodash'
import { useRoutes } from 'react-router-dom'

import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

import { ContactUs, Contribute } from '@/features/ContactUs'
import { Landing } from '@/features/misc'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const AppRoutes = () => {
  const token = useCurrentUser()

  // const { isAuthenticated } = useAuth0()
  //
  // console.log('isAuthenticated', isAuthenticated)

  const commonRoute = [
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: 'contact-us',
      element: <ContactUs />,
    },
    {
      path: 'contribute',
      element: <Contribute />,
    },
    {
      path: 'faq',
      element: <Contribute />,
    },
    {
      path: '*',
      element: <Landing />,
    },
  ]
  const routes = isEmpty(token) ? publicRoutes : protectedRoutes
  const element = useRoutes([...routes, ...commonRoute])
  return <>{element}</>
}
