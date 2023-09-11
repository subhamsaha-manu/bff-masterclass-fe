import gql from 'graphql-tag'

export const studentActivityFragment = gql`
  fragment studentActivity on StudentActivity {
    uuid
    status
  }
`
