import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'
import { makeFactory } from 'factory.ts'

import { Activity } from '@/types'

export const anActivity = makeFactory<Activity>({
  uuid: Factory.each(() => faker.string.uuid()),
  name: Factory.each(() => faker.string.sample(10)),
  description: Factory.each(() => faker.string.sample(10)),
  completionPercentage: Factory.each(() => faker.number.int({ max: 100 })),
  classId: Factory.each(() => faker.string.uuid()),
  __typename: 'Activity',
})
