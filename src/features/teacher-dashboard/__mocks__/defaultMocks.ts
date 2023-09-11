import { lockUnlockActivityMock } from './mutation.mocks'
import { teacherDashboardMock } from './query.mocks'

import { createDefaultMocks } from '@/test/createMocks'

export const defaultMocks = createDefaultMocks(() => ({
  teacherDashboardMock: teacherDashboardMock(),
  lockUnlockActivityMock: lockUnlockActivityMock,
}))
