import { DocumentNode } from '@apollo/client'
import { GraphQLError } from 'graphql'

export function createMock<V, R extends { __typename?: string }>(
  query: DocumentNode,
  variables: V,
  data: Omit<R, '__typename'>,
  error?: GraphQLError
): CustomMockedResponse<V, R> {
  return {
    request: {
      query,
      variables,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newData: jest.fn<GraphqlNewData<R>, any>(() => ({
      data: {
        ...data,
        __typename: 'Query',
      },
      errors: error && [error],
    })),
  }
}

export type CustomMockedResponse<V, R> = {
  request: { variables: V; query: DocumentNode }
  newData: jest.Mock<GraphqlNewData<R>>
}

type GraphqlNewData<R> = { data?: Omit<R, '__typename'>; errors?: GraphQLError[] }
