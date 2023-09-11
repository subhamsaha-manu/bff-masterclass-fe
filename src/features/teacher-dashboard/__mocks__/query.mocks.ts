import { teacherDashboard } from '../apis/teacherDashboard'
import {
  TeacherDashboardQuery,
  TeacherDashboardQueryVariables,
} from '../apis/teacherDashboard.generated'

import { anActivity } from '@/factories/anActivity'
import { aStudent } from '@/factories/aStudent'
import { createOverridableMock } from '@/test/createMocks'
import { ActivityStatus } from '@/types'
import { ACTIVITY_ID_1, CLASS_ID, STUDENT_ID_1 } from '@/utils/constants'

export const teacherDashboardMock = createOverridableMock<
  TeacherDashboardQueryVariables,
  TeacherDashboardQuery
>(
  teacherDashboard,
  {
    classId: CLASS_ID,
  },
  {
    activitiesInClass: [
      anActivity.build({
        uuid: ACTIVITY_ID_1,
      }),
      anActivity.build(),
    ],
    students: [
      aStudent.build({
        uuid: STUDENT_ID_1,
        activities: [
          {
            uuid: ACTIVITY_ID_1,
            status: ActivityStatus.Unlocked,
          },
        ],
      }),
    ],
  }
)
