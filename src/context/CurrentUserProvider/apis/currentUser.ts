import { gql } from '@apollo/client'

export const currentUser = gql`
  query currentUser {
    currentUser {
      uuid
      name
      email
    }
  }
`
