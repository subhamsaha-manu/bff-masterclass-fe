import { lockUnlockActivity } from '../apis/lockUnlockActivity'
import {
  LockUnlockActivityMutation,
  LockUnlockActivityMutationVariables,
} from '../apis/lockUnlockActivity.generated'

import { createMutationMock } from '@/test/createMocks'
import { ActivityStatus } from '@/types'
import { ACTIVITY_ID_1, STUDENT_ID_1 } from '@/utils/constants'

export const lockUnlockActivityMock = createMutationMock<
  LockUnlockActivityMutationVariables,
  LockUnlockActivityMutation
>(
  lockUnlockActivity,
  {
    lockUnlockActivityInput: {
      activityId: ACTIVITY_ID_1,
      studentId: STUDENT_ID_1,
      status: ActivityStatus.Locked,
    },
  },
  {
    lockUnlockActivity: true,
  }
)
