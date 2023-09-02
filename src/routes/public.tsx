import { Navigate } from 'react-router-dom'

import { AuthRoutes } from '@/features/auth'

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
  { path: '*', element: <Navigate to="." /> },
]
