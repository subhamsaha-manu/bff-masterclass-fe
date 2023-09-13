import gql from 'graphql-tag'

export const activitiesInClass = gql`
  query activitiesInClass($classId: ID!) {
    activitiesInClass(classId: $classId) {
      uuid
      name
      description
      classId
    }
  }
`
