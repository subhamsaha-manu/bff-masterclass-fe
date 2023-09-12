import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'
import { makeFactory } from 'factory.ts'

import { User } from '@/types'

export const anUser = makeFactory<User>({
  uuid: Factory.each(() => faker.string.uuid()),
  name: Factory.each(() => faker.string.sample(10)),
  email: Factory.each(() => faker.internet.email()),
  __typename: 'User',
})
