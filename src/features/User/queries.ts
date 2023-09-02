import gql from 'graphql-tag'

export const addModifyFriend = gql`
  mutation addModifyFriend($input: FriendInput!) {
    addModifyFriend(input: $input) {
      code
      message
    }
  }
`

export const updateUser = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      uuid
      name
      email
    }
  }
`
