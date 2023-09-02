import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  query login($input: LoginUserInput!) {
    login(input: $input) {
      name
      token
      message
    }
  }
`

export const SIGNUP_USER = gql`
  mutation signup($input: SignupUserInput!) {
    signup(input: $input) {
      name
      token
      message
    }
  }
`
export const USER = gql`
  query currentUser {
    currentUser {
      uuid
      name
      email
      mobileNumber
    }
  }
`
