import { activitiesInClassMock } from './query.mocks'

import { createDefaultMocks } from '@/test/createMocks'

export const defaultMocks = createDefaultMocks(() => ({
  activitiesInClassMock: activitiesInClassMock(),
}))
