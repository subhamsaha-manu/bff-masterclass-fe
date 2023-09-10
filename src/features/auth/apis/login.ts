import { gql } from '@apollo/client'

export const login = gql`
  query login($input: LoginUserInput!) {
    login(input: $input) {
      name
      token
      message
    }
  }
`
