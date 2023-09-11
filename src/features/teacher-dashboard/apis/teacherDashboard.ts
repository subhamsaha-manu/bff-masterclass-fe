import gql from 'graphql-tag'

import { studentActivityFragment } from './fragments'

export const teacherDashboard = gql`
  query teacherDashboard($classId: ID!) {
    activitiesInClass(classId: $classId) {
      uuid
      name
      description
      completionPercentage
      classId
    }

    students {
      uuid
      name
      activities {
        ...studentActivity
      }
    }
  }
  ${studentActivityFragment}
`
