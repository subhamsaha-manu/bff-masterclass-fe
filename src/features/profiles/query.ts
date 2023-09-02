import { gql } from '@apollo/client'

export const friends = gql`
  query friends {
    friends {
      uuid
      name
      birthday
      email
      mobileNumber
      avatar
    }
  }
`
