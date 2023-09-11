import { teacherDashboard } from '../apis/teacherDashboard'
import {
  TeacherDashboardQuery,
  TeacherDashboardQueryVariables,
} from '../apis/teacherDashboard.generated'

import { anActivity } from '@/factories/anActivity'
import { aStudent } from '@/factories/aStudent'
import { createOverridableMock } from '@/test/createMocks'
import { CLASS_ID } from '@/utils/constants'

export const teacherDashboardMock = createOverridableMock<
  TeacherDashboardQueryVariables,
  TeacherDashboardQuery
>(
  teacherDashboard,
  {
    classId: CLASS_ID,
  },
  {
    activitiesInClass: [anActivity.build(), anActivity.build()],
    students: [aStudent.build()],
  }
)
