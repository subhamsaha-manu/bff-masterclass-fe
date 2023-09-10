import { activitiesInClass } from '../apis/activitiesInClass'
import {
  ActivitiesInClassQuery,
  ActivitiesInClassQueryVariables,
} from '../apis/activitiesInClass.generated'

import { anActivity } from '@/factories/anActivity'
import { createOverridableMock } from '@/test/createMocks'
import { CLASS_ID } from '@/utils/constants'

export const activitiesInClassMock = createOverridableMock<
  ActivitiesInClassQueryVariables,
  ActivitiesInClassQuery
>(
  activitiesInClass,
  {
    classId: CLASS_ID,
  },
  {
    activitiesInClass: [anActivity.build(), anActivity.build()],
  }
)
