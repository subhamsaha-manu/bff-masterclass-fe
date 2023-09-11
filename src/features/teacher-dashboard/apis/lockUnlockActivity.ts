import gql from 'graphql-tag'

export const lockUnlockActivity = gql`
  mutation lockUnlockActivity($lockUnlockActivityInput: LockUnlockActivityInput!) {
    lockUnlockActivity(lockUnlockActivityInput: $lockUnlockActivityInput)
  }
`
