import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { SpinnerContainer } from '@/components/elements/Spinner'
import { MainLayout } from '@/components/Layout'
import { CurrentUserConsumer } from '@/context/CurrentUserProvider'
import { lazyImport } from '@/utils/lazyImport'

const { Dashboard } = lazyImport(() => import('@/features/dashboard'), 'Dashboard')
const { TeacherDashboard } = lazyImport(
  () => import('@/features/teacher-dashboard'),
  'TeacherDashboard'
)

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
      { path: '', element: <Dashboard /> },
      { path: 'teacher-dashboard', element: <TeacherDashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
