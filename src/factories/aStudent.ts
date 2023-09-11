import { faker } from '@faker-js/faker'
import * as Factory from 'factory.ts'
import { makeFactory } from 'factory.ts'

import { ActivityStatus, Student, StudentActivity } from '@/types'

const studentActivity = makeFactory<StudentActivity>({
  uuid: Factory.each(() => faker.string.uuid()),
  status: ActivityStatus.Completed,
  __typename: 'StudentActivity',
})
export const aStudent = makeFactory<Student>({
  uuid: Factory.each(() => faker.string.uuid()),
  name: Factory.each(() => faker.string.sample(10)),
  activities: Factory.each(() => [studentActivity.build(), studentActivity.build()]),
  __typename: 'Student',
})
