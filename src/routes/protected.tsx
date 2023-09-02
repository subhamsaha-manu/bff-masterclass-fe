import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MainLayout } from '@/components/Layout'
// eslint-disable-next-line no-restricted-imports
import { CurrentUserConsumer } from '@/features/auth/components'
import { lazyImport } from '@/utils/lazyImport'

const { AddFriend } = lazyImport(() => import('@/features/User'), 'AddFriend')
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard')
const { UpdateUser } = lazyImport(() => import('@/features/User'), 'UpdateUser')
const { CloseFriends } = lazyImport(() => import('@/features/User'), 'CloseFriends')
const App = () => {
  return (
    <CurrentUserConsumer>
      {(state) => (
        <MainLayout context={state}>
          <Suspense fallback={<SpinnerContainer size="xl" />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      )}
    </CurrentUserConsumer>
  )
}
export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'add-friend', element: <AddFriend /> },
      { path: 'my-account', element: <UpdateUser /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'close-friends', element: <CloseFriends /> },
      { path: '', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
