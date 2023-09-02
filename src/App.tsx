import { AppProvider } from './providers/app'
import { AppRoutes } from './routes'

//initMocks()
export const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
