import { setupWorker } from 'msw'

import { handlers } from './handlers'

export const initMocks = () => {
  if (process.env.REACT_APP_API_MOCKING === 'true') {
    setupWorker(...handlers).start()
  }
}
